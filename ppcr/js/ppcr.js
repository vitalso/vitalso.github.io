/**
 * Default options for Highcharts
 */
Highcharts.setOptions({
    lang : {
	    thousandsSep : ","
    },
    credits : {
	    enabled : false
    },
    title : {
	    text : null
    }
});

var ppcr = {

    pageLoaders : 0,
    
    /**
	 * Initialize the app
	 */
    init : function() {
    	ppcr.pushNotifications.init();
    	ppcr.exportFiles.init();
    	ppcr.momentTracker();
    	ppcr.adwordsImportStatus.init();
    	ppcr.crawlerStatus.init();
    	ppcr.fixDropdownPosition();
    },

    /**
	 * Create an UUID version 4 (random generated).
	 * 
	 * @returns String
	 */
    uuid : function() {
	    var d = new Date().getTime();
	    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		    var r = (d + Math.random() * 16) % 16 | 0;
		    d = Math.floor(d / 16);
		    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	    });
	    return uuid;
    },

    /**
	 * Push Notifications Service
	 */
    pushNotifications : {
    	
    	checkTimeout: null,

        /**
		 * Initialize push notifications
		 */
        init : function() {
        	
        	// Check push notifications in 5 seconds
        	setTimeout(function() {
		        ppcr.pushNotifications.check();
	        }, 5000);
        	
        	// Hide push notifications when clicking on it
        	$(".dropdown.dropdown-push-notifications").on("click", "a.push-notification-link", function() {
        		ppcr.pushNotifications.seen($(this).parent().data("id"), $(this).attr("href"));
        		return false;
        	});
        	
        },

        /**
		 * Check for push notifications
		 */
        check : function() {
        	
        	// Clear existing timeouts
        	clearTimeout(ppcr.pushNotifications.checkTimeout);

            $.get("/push-notifications/check.json", function(response) {
                if (response && response.pushNotifications && response.pushNotifications.length > 0) {
                    $.each(response.pushNotifications, function(index, pushNotification) {
                        ppcr.pushNotifications.add(pushNotification);
                    });
                }

                // Re-check push notifications later
                ppcr.pushNotifications.checkTimeout = setTimeout(function() {
                    ppcr.pushNotifications.check();
                }, 60000);
            });
        },
        
        /**
		 * Add a push notification to the view
		 */
        add: function(pushNotification) {
        	var $pushNotification = $("#push-notification-" + pushNotification.id);
			
			// Handle new push notifications
			if ($pushNotification.length == 0) {
				toastr["info"](pushNotification.message, pushNotification.title);
				$pushNotification = $("<li>").attr("id", "push-notification-" + pushNotification.id).addClass("push-notification").data("id", pushNotification.id).append($("<a>").addClass("push-notification-link").attr("href", pushNotification.url || "#").append($("<div>").append($("<i>").addClass("fa fa-fw fa-" + pushNotification.icon)).append(" ").append(pushNotification.title).append($("<span>").addClass("pull-right text-muted small moment-tracker").data("time", pushNotification.created).text(moment.utc(pushNotification.created).fromNow()))));
				var $dropdownMenu = $(".dropdown.dropdown-push-notifications").find(".dropdown-menu");
				if ($dropdownMenu.find("li.push-notification").length > 0) {
					$pushNotification.insertBefore($dropdownMenu.find("li.push-notification").first());
				}
				else {
					if ($dropdownMenu.find("li").not(".divider").not(".show-all").length > 0) {
						$("<li>").addClass("divider").insertBefore($dropdownMenu.find("li.show-all"));
					}
					$pushNotification.insertBefore($dropdownMenu.find("li.show-all"));
				}
				ppcr.pushNotifications.updateLabel();
				$.post("/push-notifications/listed/" + pushNotification.id + ".json");
			}
        },
        
        /**
		 * Update push notifications count label
		 */
        updateLabel: function() {
        	var count = $(".dropdown.dropdown-push-notifications").find(".dropdown-menu").find("li").not(".divider").not(".show-all").length;
        	$(".dropdown-push-notifications .count-info .label").text(count).toggleClass("label-warning", count > 0).toggleClass("label-primary", count == 0);
        },
        
        /**
		 * Update push notification status
		 */
        seen: function(id, url) {
        	$.post("/push-notifications/seen/" + id + ".json", function() {
    			$("#push-notification-" + id).remove();
    			$("#push-notification-list-" + id).removeClass("info");
    			if ($(".dropdown-push-notifications").find(".push-notification").length == 0) {
        			$(".dropdown-push-notifications").find("li.divider").remove();
        		}
    			ppcr.pushNotifications.updateLabel();
    			location.href = url;
    		});
        }
        
    },
    
    /**
	 * Export Files Service
	 */
    exportFiles: {
    	
    	checkTimeout: null,
    	
    	/**
		 * Initialize export files
		 */
    	init: function() {
    		$(".dropdown.dropdown-push-notifications").on("click", ".export-file", function() {
    			return false;
    		});
    		
    		if ($(".dropdown.dropdown-push-notifications").find(".export-file").length > 0) {
    			window.setTimeout(function() {
    				ppcr.exportFiles.check();
    			}, 10000);
    		}
    	},
    	
    	/**
		 * Chekc for running file exports
		 */
        check: function() {
        	
        	// Clear existing timeouts
        	clearTimeout(ppcr.exportFiles.checkTimeout);
        	
        	// Load running export files
        	$.get("/export-files/running.json", function(response) {
        		
        		if (response.exportFiles.length > 0) {
        			
        			// Update or insert export files
        			$.each(response.exportFiles, function(i, exportFile) {
        				var $exportFile = $("#export-file-" + exportFile.id);
        				if ($exportFile.length == 0) {
                			ppcr.exportFiles.add(exportFile);
        				}
        				else {
        					var percent = (exportFile.row_count == 0 ? 0 : Math.round(100 * exportFile.rows_done / exportFile.row_count)) + '%';
        					$exportFile.find(".progress-bar").css({width: percent});
        					$exportFile.find(".percent").text(percent);
        				}
        			});
        			
        			// Check export files in 10 seconds again
        			ppcr.exportFiles.checkTimeout = setTimeout(function() {
        				ppcr.exportFiles.check();
        			}, 10000);
        			
        		}
        		
        		// Cleanup export files
        		var removed = 0;
        		$(".dropdown-push-notifications").find(".download").each(function() {
        			var id = $(this).data("export-file-id");
        			var running = false;
        			if (response.exportFiles.length > 0) {
        				$.each(response.exportFiles, function(i, exportFile) {
        					if (exportFile.id == id) {
        						running = true;
        						return false;
        					}
        				});
        			}
        			if (!running) {
        				removed++;
        				$(this).remove();
        			}
        		});
        		if ($(".dropdown-push-notifications").find(".download").length == 0) {
        			$(".dropdown-push-notifications").find("li.divider").remove();
        		}
        		ppcr.pushNotifications.updateLabel();
        		
        		// Check for push notifications
        		if (removed > 0) {
        			ppcr.pushNotifications.check();
        		}
        		
        	});
        },
        
        /**
		 * Add an export file to the push notifications dropdown
		 */
        add: function(exportFile) {
        	var percent = (exportFile.row_count == 0 ? 0 : Math.round(100 * exportFile.rows_done / exportFile.row_count)) + '%';
        	var $exportFile = $("<li>").addClass("download").data("export-file-id", exportFile.id).append(
        		$("<div>").addClass("export-file").attr("id", "export-file-" + exportFile.id).append(
        			$("<div>")
        				.append($("<i>").addClass("fa fa-download fa-fw"))
        				.append($("<span>").text(" " + exportFile.target_file + " "))
        				.append(
    						$("<span>").addClass("pull-right text-muted").append(
								$("<span>").addClass("percent").text(percent)
    						).append(
    							$("<i>").addClass("fa fa-circle-o-notch fa-spin fa-fw")
    						)
        				)
        		).append(
        			$("<div>").addClass("progress progress-mini").append(
        				$("<div>").addClass("progress-bar progress-bar-striped active").css({width: percent})
        			)
        		)
        	);
        	var $dropdownMenu = $(".dropdown.dropdown-push-notifications").find(".dropdown-menu");
        	if ($dropdownMenu.find("li.download").length > 0) {
        		$exportFile.insertBefore($dropdownMenu.find("li.download").first());
        	}
        	else {
        		if ($dropdownMenu.find("li").not(".divider").not(".show-all").length > 0) {
					$dropdownMenu.prepend($("<li>").addClass("divider"));
				}
        		$dropdownMenu.prepend($exportFile);
        	}
        	ppcr.pushNotifications.updateLabel();
        },
        
        /**
		 * Event executed on clicking export links.
		 */
        exportLinkEvent: function() {
        	ppcr.showPageLoader();
    		var $dropdown = $(this).closest(".dropdown-export");
    		$dropdown.find(".dropdown-toggle").dropdown("toggle");
    		$.post($(this).attr("href")).done(function(response) {
    			toastr["info"]($dropdown.data("toast-message"), $dropdown.data("toast-title"));
    			ppcr.hidePageLoader();
    			ppcr.exportFiles.check();
    		}).fail(ppcr.ajaxFail);
    		return false;
        }
    	
    },

    /**
	 * Create pie chart colors in a stylesheet
	 * 
	 * @param jQuery
	 *            $container
	 * @param Integer
	 *            colorCount
	 */
    pieChartColors : function($container, colorCount) {

	    // Set the ID if no ID is set
	    var chartId = $container.attr("id");
	    if (typeof chartId == "undefined") {
		    chartId = ppcr.uuid();
		    $container.attr("id", chartId);
	    }

	    // Create the chart style
	    var $chartStyle = $("#chart-style-" + chartId);
	    if ($chartStyle.length == 0) {
		    $chartStyle = $("<style>").attr("type", "text/css").attr("id", "chart-style-" + chartId).appendTo($("head"));
	    }

	    var divider = $container.data("divider") || 2;

	    // Calculate the colors for the chart
	    for (var i = 0; i < colorCount; i++) {
		    var color = Highcharts.Color($container.data("baseColor")).brighten((i - colorCount / divider) / colorCount).get();
		    $chartStyle.html($chartStyle.html() + "#" + chartId + " .highcharts-color-" + i + "{fill:" + color + ";color:" + color + ";}");
	    }

    },

    /**
     * Show the page loader.
     */
    showPageLoader : function() {
        if (ppcr.pageLoaders++ == 0) {
            $("#page-overlay").show();
        }
    },

    /**
     * Fix Dropdown Position.
     */
    fixDropdownPosition : function() {
        const bodyRect = document.body.getBoundingClientRect();
        document.querySelectorAll(".dropdown-element .dropdown-menu").forEach(dropdown => {
            dropdown.classList.add("check-menu");
            const dropdownRect = dropdown.getBoundingClientRect();
            const dropdownBottom = dropdownRect.top - bodyRect.top + dropdown.scrollHeight;
            if (dropdownBottom > document.body.scrollHeight) {
                dropdown.classList.add("open-top");
            }
            dropdown.classList.remove("check-menu");
        });
    },

    /**
	 * Hide the page loader.
	 */
    hidePageLoader : function() {
	    if (--ppcr.pageLoaders == 0) {
		    $("#page-overlay").hide();
	    }
    },

    /**
	 * Workaround of the default alert function. This function provides a more detailled way to display error messages.
	 * 
	 * @param level
	 * @param error
	 * @param callback
	 *            [optional]
	 */
    alert : function(level, error, callback) {
    	
    	var showDetails = typeof error.details != "undefined";
	    
	    $("#alert-modal").find(".modal-dialog").toggleClass("modal-sm", !showDetails).find(".media").hide();

	    var $alertContent = $("#alert-modal-content-" + level).show();
	    $alertContent.find(".modal-content-text").text(error.message);
	    $("#alert-modal-toggle-details").toggle(showDetails);
	    $alertContent.find(".modal-content-details-text").hide().text(showDetails ? error.details : "");

	    $("#alert-modal-button").off().on("click", function() {
		    if (typeof callback != "undefined") {
			    callback();
		    }
	    });

	    $("#alert-modal").modal({
	        show : true,
	        backdrop : "static",
	        keyboard : false
	    });

    },

    /**
	 * Workaround of the default confirm function.
	 * 
	 * @param message
	 * @param callback
	 * @param walktrough
	 */
    confirm : function(message, callback, walktrough) {

	    if (typeof walktrough != "undefined" && walktrough === true) {
		    callback(walktrough);
		    return;
	    }

	    $("#confirm-modal-text").text(message);
	    $(".confirm-modal-button").off().on("click", function() {
		    callback($(this).data("value"))
	    });

	    $("#confirm-modal").modal({
	        show : true,
	        backdrop : "static",
	        keyboard : false
	    });

    },

    /**
	 * The default method that can be used for AJAX calls in the .fail() callback.
	 * 
	 * @param jqXHR
	 * @param textStatus
	 * @param errorThrown
	 */
    ajaxFail : function(jqXHR, textStatus, errorThrown) {

	    // Hide any pageLoader
	    ppcr.hidePageLoader();

	    // Show the alert
	    ppcr.alert("danger", {
		    message : jqXHR.hasOwnProperty("responseJSON") && jqXHR.responseJSON.hasOwnProperty("message") ? jqXHR.responseJSON.message : $("#alert-modal").data("default-message")
	    });
    },
    
    /**
	 * Set the contents of moment trackers
	 */
    momentTracker : function() {
    	$(".moment-tracker").each(function() {
    		$(this).text(moment.utc($(this).data("time")).fromNow());
    	});
    	setTimeout(function() {
	        ppcr.momentTracker();
        }, 30000)
    },
    
    adwordsImportStatus: {
    	
    	interval : 60000,
    	
    	updateTimeout : null,
    	
    	init : function() {

    	    // Set timeout for the initial update
    	    if ($("#adwords-import-progress").length > 0) {
    		    ppcr.adwordsImportStatus.updateTimeout = setTimeout(function() {
    		    	ppcr.adwordsImportStatus.update();
    		    }, Math.round(ppcr.adwordsImportStatus.interval / 2 + Math.random() * ppcr.adwordsImportStatus.interval / 2));
    	    }

        },
        
        update : function() {

    	    // Clear existing timeouts
    	    clearTimeout(ppcr.adwordsImportStatus.updateTimeout);

    	    $.get("/import-status/adwords-progress.json").done(function(response) {
    		    var progressPercent = Number.parseFloat(response.expected > 0 ? Math.round(response.completed / response.expected * 10000) / 100 : 0).toFixed(2);

    		    $("#adwords-import-progress-percent").text(progressPercent + "%");
    		    $("#adwords-import-progress").find(".progress-bar").width(progressPercent + "%");

    		    $("#adwords-import-progress").toggle(response.completed != response.expected);
    		    $("#adwords-import-progress-wait").toggle(response.completed === null);
    		    $("#adwords-import-progress-running").toggle(response.completed !== null);

    		    // Set new timeout for the next update
    		    if (response.completed != response.expected) {
    		    	ppcr.adwordsImportStatus.updateTimeout = setTimeout(function() {
    			    	ppcr.adwordsImportStatus.update();
    			    }, ppcr.adwordsImportStatus.interval);
    		    }

    	    });

        }
    	
    },
    
    crawlerStatus: {
    	
    	interval : 60000,
    	
    	updateTimeout : null,
    	
    	init : function() {

    	    // Set timeout for the initial update
    	    if ($(".crawler-status").length > 0) {
    		    ppcr.crawlerStatus.updateTimeout = setTimeout(function() {
    		    	ppcr.crawlerStatus.update();
    		    }, Math.round(ppcr.crawlerStatus.interval / 2 + Math.random() * ppcr.crawlerStatus.interval / 2));
    	    }

        },
        
        update: function() {
        	
        	// Clear existing timeouts
        	clearTimeout(ppcr.crawlerStatus.updateTimeout);
        	
        	// Load crawler status
        	$.get("/crawler/status.json").done(function(response) {
        		
        		var total = {
        			host_id: "total",
        			total: 0,
        			done: 0,
        			min_schedule_time: null,
        			max_schedule_time: null
        		};
        		
        		// Update status by host
        		$.each(response.crawlerStatus, function(index, host) {
        			
    				ppcr.crawlerStatus.updateStatus(host);
    				
    				// Collect total
    				total.total += parseInt(host.total);
    				total.done += parseInt(host.done);
    				host.min_schedule_time = moment.utc(host.min_schedule_time);
    				host.max_schedule_time = moment.utc(host.max_schedule_time);
    				if (total.min_schedule_time == null || total.min_schedule_time > host.min_schedule_time) {
    					total.min_schedule_time = host.min_schedule_time;
    				}
    				if (total.max_schedule_time == null || total.max_schedule_time < host.max_schedule_time) {
    					total.max_schedule_time = host.max_schedule_time;
    				}
        			        			
        		});
        		
        		// Update total status
        		if (total.total > 0) {
        			total.min_schedule_time = total.min_schedule_time.format("YYYY-MM-DD HH:mm:ss");
        			total.max_schedule_time = total.max_schedule_time.format("YYYY-MM-DD HH:mm:ss");
        			ppcr.crawlerStatus.updateStatus(total);
        		}
        		
        		// Set new timeout for the next update
    		    if (total.done != total.total) {
    		    	ppcr.crawlerStatus.updateTimeout = setTimeout(function() {
    			    	ppcr.crawlerStatus.update();
    			    }, ppcr.crawlerStatus.interval);
    		    }
        		
        	});
        	
        },
        
        updateStatus(host) {
        	
        	var $statusBox = $("#crawler-status-" + host.host_id);
        	if ($statusBox.length == 0) {
        		return;
        	}
        	
        	var progressPercent = Number.parseFloat(host.total > 0 ? Math.round(host.done / host.total * 10000) / 100 : 0).toFixed(2);
        	
        	$statusBox.find(".crawler-status-progress").toggle(host.done != host.total);
        	$statusBox.find(".crawler-status-finished").toggle(host.done == host.total);
			
			$statusBox.find(".crawler-status-percent").text(progressPercent + "%");
			$statusBox.find(".progress-bar").width(progressPercent + "%");
			$statusBox.find(".crawler-status-total").text(parseInt(host.total).toLocaleString("en-US"));
			$statusBox.find(".crawler-status-done").text(parseInt(host.done).toLocaleString("en-US"));
			$statusBox.find(".crawler-status-max-time").text(host.max_schedule_time);
			$statusBox.find(".crawler-status-min-time").text(host.min_schedule_time);
			
        }
    	
    }

};

$(function() {

	/**
	 * Initialize push notifications
	 */
	ppcr.init();

	/**
	 * Activate Tooltips
	 */
	$("[data-toggle='tooltip']").tooltip();

	// Navbar checkboxes
	$("#navbar-filter .dropdown-menu .item .fa").on("click", function() {
		
		// Check item state
		if ($(this).closest("li").is(".disabled,.default")) {
			return false;
		}
		
		// Toggle class
		$(this).toggleClass("fa-check-circle-o").toggleClass("fa-circle-o");
		
		// Toggle labels by account selection
		if ($(this).closest(".item").data("type") == "accounts") {
			
			// Collect selected account ids
			var accountIds = [];
			$(this).closest(".dropdown-menu").find(".item").each(function() {
				if ($(this).find(".fa.fa-check-circle-o").length > 0) {
					accountIds.push($(this).data("id"));
				}
			});
			
			// Show or hide the labels and toggle checked state
			$(this).closest(".nav").find(".dropdown-labels").find(".item").each(function() {
				$(this).addClass("hidden");
				for (var a in accountIds) {
					if ($(this).data("account-id") == accountIds[a]) {
						$(this).removeClass("hidden");
					}
				}
				if ($(this).is(".hidden") && $(this).find(".fa").is(".fa-check-circle-o")) {
					$(this).find(".fa").removeClass("fa-check-circle-o").addClass("fa-circle-o");
				}
			});
			
		}
		
		// Count the number of selected items and display the label for each dropdown
		$("#navbar-filter .dropdown").each(function() {
			var selectCount = $(this).find(".item .fa.fa-check-circle-o").length;
			$(this).find(".label").text(selectCount).toggleClass("label-warning", selectCount == 0).toggleClass("label-primary", selectCount > 0);
		});
		
		return false;
		
	});
	
	// Navbar direct selections
	$("#navbar-filter .dropdown-menu .item .name").on("click", function() {
		
		// Check item state
		if ($(this).closest("li").is(".disabled,.default")) {
			return false;
		}
		
		// Uncheck all siblings
		$(this).closest(".dropdown-menu").find("li:not(.default) .item .fa.fa-check-circle-o").trigger("click");
		
		// Check this item
		$(this).closest(".item").find(".fa").trigger("click");
		
		// Apply filter
		$("#navbar-filter-apply").trigger("click");
		
		return false;
	});

	// Account Overview go to specific Account
	$(".goto-account").on("click", function() {

		var accountid = $(this).data("id");

		// Uncheck all siblings
		$("#navbar-filter .dropdown-menu").find("li:not(.default) .item .fa.fa-check-circle-o").trigger("click");

		// Find Account ID Item
        $(".item[data-id="+accountid+"] .fa-circle-o").trigger("click");

        // Apply filter
		$("#navbar-filter-apply").trigger("click");

		return false;
	});


	// Select all accounts button
	$(".dropdown-accounts .buttons .select-all").on("click", function() {
		var dataAccount = $(this).data('account')
		$(".dropdown-accounts .item." + dataAccount + " .fa.fa-circle-o").trigger("click");
		return false;
	});
	
	// Deselect all accounts button
	$(".dropdown-accounts .buttons .deselect-all").on("click", function() {
		var dataAccount = $(this).data('account')
		$(".dropdown-accounts .item." + dataAccount + " .fa.fa-check-circle-o").trigger("click");
		return false;
	});

	// Apply navbar filter
	$("#navbar-filter-apply").on("click", function() {

		// Collect the settings
		var settings = {
			navbar : {
				filter : {
					"data" : "post"
				}
			}
		};
		$("#navbar-filter .item .fa.fa-check-circle-o").each(function() {

			// Determine the type and its id
			var type = $(this).closest(".item").data("type");
			var id = $(this).closest(".item").data("id");

			// Create the settings entry
			if (!settings.navbar.filter.hasOwnProperty(type)) {
				settings.navbar.filter[type] = [];
			}
			settings.navbar.filter[type].push(id);

		});

		// Send the settings
		ppcr.showPageLoader();
		$.post('/settings/write.json', {
			"Settings" : settings
		}, function() {
			if(window.location.pathname === '/quality-score/account-summary'){
				window.location = "/quality-score/dashboard";
			}else{
				location.reload();
			}
		});

		return false;
	});

	// Custom daterange
	$("#navbar-custom-daterange").datepicker({
	    format : 'yyyy-mm-dd',
	    keyboardNavigation : false,
	    autoclose : true
	}).find("input").on("focus", function() {
		$("#navbar-daterange .daterange-select .fa-check-circle-o").toggleClass("fa-check-circle-o", false).toggleClass("fa-circle-o", true);
		$("#navbar-daterange .custom-datepicker .fa").toggleClass("fa-check-circle-o", true).toggleClass("fa-circle-o", false);
	});
	$("#navbar-daterange .custom-datepicker").on("click", function() {
		return false;
	});
	$("#navbar-daterange-apply").on("click", function() {
		ppcr.showPageLoader();
		$("#navbar-daterange .daterange-select .fa-check-circle-o").toggleClass("fa-check-circle-o", false).toggleClass("fa-circle-o", true);
		$("#navbar-daterange .custom-datepicker .fa").toggleClass("fa-check-circle-o", true).toggleClass("fa-circle-o", false);
		$.post('/settings/write.json', {
			"Settings" : {
				navbar : {
					daterange : {
					    selected : "custom",
					    from : $("#navbar-custom-daterange [name='start']").val(),
					    to : $("#navbar-custom-daterange [name='end']").val()
					}
				}
			}
		}, function() {
			location.reload();
		});

		return false;
	});
	
	// Select preset daterange
	$("#navbar-daterange .daterange-select").on("click", function() {
		$("#navbar-daterange .custom-datepicker .fa").toggleClass("fa-check-circle-o", false).toggleClass("fa-circle-o", true);
		$("#navbar-daterange .daterange-select .fa-check-circle-o").toggleClass("fa-check-circle-o", false).toggleClass("fa-circle-o", true);
		$(this).find(".fa").toggleClass("fa-check-circle-o", true).toggleClass("fa-circle-o", false);
		ppcr.showPageLoader();
		$.post('/settings/write.json', {
			"Settings" : {
				navbar : {
					daterange : {
						selected : $(this).data("daterange")
					}
				}
			}
		}, function() {
			location.reload();
		});

		return false;
	});

	/**
	 * Re-draw charts on activated tabs to show them in the correct size
	 */
	$('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
		var chart = $($(e.target).attr("href")).find(".qs-chart").highcharts();
		if (chart) {
			chart.reflow();
		}
	});

	/**
	 * Chart Buttons
	 */
	$(".chart-button").on("click", function() {
		var serie = $($(this).data("target")).highcharts().series[$(this).data("serie")].setVisible($(this).is(".serie-hidden"));
		$(this).toggleClass("serie-hidden");
		return false;
	});
	
	$("[data-toggle='confirm']").on("click", function() {
		var $elem = $(this);
		ppcr.confirm($elem.data("message"), function(confirm) {
			if (confirm) {
				if ($elem.data("action") === "post") {
					$("<form>", {
						"action": $elem.attr("href"),
						"method": "post"
					}).appendTo("body").submit();
				}
			}
		});
		return false;
	});
	
	/**
	 * Export file links
	 */
	$(".export-file-link").on("click", ppcr.exportFiles.exportLinkEvent);

	// Collapse ibox function
    $('.collapse-link').on('click', function (e) {
        e.preventDefault();
        var ibox = $(this).closest('div.ibox');
        var itemFilter = $(this).closest('div.filter-item');
        var button = $(this).find('i');
        var itemFilterButton = itemFilter.find('.btn-item-detail');
        var content = ibox.children('.ibox-content');
        var itemFilterContent = itemFilter.children('.audit-item-content');
        content.slideToggle(200);
        itemFilterContent.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        itemFilterButton.toggleClass('active');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    });

    // Close ibox function
    $('.close-link').on('click', function (e) {
        e.preventDefault();
        var content = $(this).closest('div.ibox');
        content.remove();
    });

});

/**
 * Convert a date string in the format YYYY-MM-DD into an UTC date.
 * 
 * @param dateString
 * @returns
 */
function dateStringToUTC(dateString) {
	var year = parseInt(dateString.substr(0, 4));
	var month = parseInt(dateString.substr(5, 2)) - 1;
	var day = parseInt(dateString.substr(8, 2));
	return Date.UTC(year, month, day);
}

/**
 * Get the lowest value of an array.
 * 
 * @param arr
 * @returns
 */
function min(arr) {
	var min = null;
	for ( var i in arr) {
		if (min === null || arr[i] < min) {
			min = arr[i];
		}
	}
	return min;
}

/**
 * Get the highest value of an array.
 * 
 * @param arr
 * @returns
 */
function max(arr) {
	var max = null;
	for ( var i in arr) {
		if (max === null || arr[i] > max) {
			max = arr[i];
		}
	}
	return max;
}

/**
 * Format a Select2 Account
 * 
 * @param account
 * @returns
 */
function select2FormatAccount(account) {
	if (!account.id) {
		return account.text;
	}
	return $("<div>").css({
		whiteSpace : "normal"
	}).append($("<span>").text(account.text)).append($("<span>").addClass("pull-right text-muted small").text($(account.element).data("text-id")));
}

$.fn.extend({
	selectDropdown : function(options) {

		// Set the options
		var _defaultOptions = {
			callback : function() {
			}
		};
		options = $.extend({}, _defaultOptions, options);

		return this.each(function() {

			var dropdown = $(this).parent();
			var dropdownButton = $(this);
			var dropdownMenu = dropdown.find(".dropdown-menu");

			dropdownMenu.find("li>a").on("click", function(event) {

				// Check if the current button is disabled
				if ($(this).parent().is(".disabled")) {
					return false;
				}

				// Add variables to the event
				event.dropdown = dropdown;
				event.dropdownButton = dropdownButton;
				event.dropdownMenu = dropdownMenu;

				// Execute callback function
				options.callback(event);

				// Set the display name
				dropdownButton.find(".dropdown-title").text($(this).text());

				// Activate the current selection
				dropdownMenu.find("li").removeClass("disabled");
				$(this).parent().addClass("disabled");

				// Close the dropdown
				dropdownButton.dropdown("toggle");

				// Stop Event Propagation
				return false;

			});
		});

	}
});

$(document).ready(function(){

    $(window).resize(function(){
        ppcr.fixDropdownPosition();
    });

    $(document).click(function(e) {

        let $elem = $(e.target);
        let $openDropdownMenu = $elem.closest(".dropdown-menu.show");
        if ($openDropdownMenu.length > 0) {
            let $openInnerMenu = $openDropdownMenu.find(".inner-menu-collapse.show");
            if ($openInnerMenu.length > 0) {
                $openInnerMenu.removeClass("show");
            }
            return;
        }

        $(".dropdown-menu.show").removeClass("show");
        $(".inner-menu-collapse.show").removeClass("show");

    });

    // Right side nav add .active class to sub-nav
    $('#right-side-nav a.label-link').on('click' , function(){

        $(this).next(".sub-nav").collapse('toggle').prev('a').toggleClass('collapsed');
        $('#right-side-nav').find(".sub-nav.show").collapse('hide');
        $('#right-side-nav a.label-link').not(this).addClass('collapsed');

    });

    // Smooth scroll to the section
    $("#right-side-nav .sub-nav a:not([href^='#third-level'])").on('click' , function(e){
        e.preventDefault();

        $("#right-side-nav .sub-nav a").removeClass('active');
        $(this).addClass('active');
        var target = $(this).attr("href");
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 1000);
    });

    // Toogle all button
    $('.toggle-box').on('click' , function(e){
        e.preventDefault();

        $('.panel-body .ibox').toggleClass('open');
        $('.panel-body .ibox .ibox-content').slideToggle(200);

    });

    // Read more function
    $('.read-more-btn').on('click' , function(){
        $(this).closest('div').find('.excerpt-row.collapse').collapse('toggle');
        $(this).toggleClass('not-open');
    });

    $('.expand-table-btn').on('click' , function(e){
        e.preventDefault();

        $(this).closest('div').find('.expanded-table.collapse').collapse('toggle');
        $(this).toggleClass('not-open');
    });

    // Sticky right side nav
    var $rightSideNav = $('#right-side-nav');
    if ($rightSideNav.length > 0) {
        var top_position_nav = $rightSideNav.offset().top;

        $(window).on('scroll' , function(){
            if ( $(window).scrollTop() >= top_position_nav ) {
                $('#right-side-nav').closest('.col-lg-2').addClass('sticky');
            } else {
                $('#right-side-nav').closest('.col-lg-2').removeClass('sticky');
            }
        });
    }

    // Filter
    const filters = document.querySelectorAll('.filter');

    const countError = document.querySelectorAll('.filter-content .filter-item[data-filter="error"]').length;
    const countWorking = document.querySelectorAll('.filter-content .filter-item[data-filter="working"]').length;
    const countNotice = document.querySelectorAll('.filter-content .filter-item[data-filter="notice"]').length;

    $('.audit-page, .audit-head').find('.audit-count').text(countError+countWorking+countNotice);
    $('.filter-container .nav-link[data-filter="error"]').find('.filter-count').text(countError);
    $('.filter-container .nav-link[data-filter="working"]').find('.filter-count').text(countWorking);
    $('.filter-container .nav-link[data-filter="notice"]').find('.filter-count').text(countNotice);

    filters.forEach(filter => {

        filter.addEventListener('click', function() {

            let selectedFilter = filter.getAttribute('data-filter');

			$('.audit-filter a').removeClass('active');
			this.classList.add('active');

            let itemsToHide = document.querySelectorAll(`.filter-content .filter-item:not([data-filter='${selectedFilter}'])`);
            let itemsToShow = document.querySelectorAll(`.filter-content [data-filter='${selectedFilter}']`);

            if (selectedFilter == 'all') {
                itemsToHide = [];
                itemsToShow = document.querySelectorAll('.filter-content [data-filter]');
            }

            itemsToHide.forEach(el => {

                el.classList.add('hide');
                el.classList.remove('showing');
            });

            itemsToShow.forEach(el => {
                el.classList.remove('hide');
                el.classList.add('showing');
            });

            $('.filter-content').each(function(index, element){

                if ( $(this).find('.filter-item.showing').length == 0 ) {
                    $(this).find('.alert').removeClass('d-none');
                } else {
                    $(this).find('.alert').addClass('d-none');
                }

            });

        });
    });

	// Category filter
	const category = $('.subfilter a');

	category.on('click' , function(e){
		e.preventDefault();
		
		var selectedCategory = $(this).data('category');
		category.removeClass('sub-active');
		$(this).addClass('sub-active');

		if ( selectedCategory == 'all' ) {
			$('.filter-content .filter-item[data-category]').show();
		} else {
			$(`.filter-content .filter-item:not([data-category='${selectedCategory}'])`).hide();
			$(`.filter-content .filter-item[data-category='${selectedCategory}']`).show();
		}
	});

});

// Select plan in modal
$('.plan-switcher input[type="radio"]').on('click' , function(){
    $('#modal-price .current-price').text($(this).val());

    $('.plan-switcher label').removeClass('checked-switcher');
    $(this).closest('label').addClass('checked-switcher');

    if ( $(this).is(':checked') && $(this).attr('id') == 'pay-month' ) {
        $('#go-to-payment').attr('href' , pathMonth);
    } else {
        $('#go-to-payment').attr('href' , pathYear);
    }
});


// Select plan on switch button
$('#plan-price .current-price').text();
$('#switch').on('change' , function(){
    if ( $(this).is(':checked') ) {
        if ( paymentStatus == 'month') {
            //$('#change-plan').removeClass('disabled').attr('href', pathYear);
            $('#change-plan').removeClass('disabled').attr('href', '/subscription/update-subscription-year');
        }
        if ( paymentStatus == 'year') {
            $('#change-plan').addClass('disabled').attr('href', pathYear);
        }
        $('#plan-price .current-price').text(yearPrice);
        $('.plan-switch').closest('.ibox-content').find('.alert.month').addClass('d-none');
        $('.plan-switch').closest('.ibox-content').find('.alert.year').removeClass('d-none');
    } else {
        if ( paymentStatus == 'year') {
            //$('#change-plan').removeClass('disabled').attr('href', pathMonth);
            $('#change-plan').removeClass('disabled').attr('href', '/subscription/update-subscription-month');
        }
        if ( paymentStatus == 'month') {
            $('#change-plan').addClass('disabled').attr('href', pathYear);
        }
        $('#plan-price .current-price').text(monthPrice);
        $('.plan-switch').closest('.ibox-content').find('.alert.month').removeClass('d-none');
        $('.plan-switch').closest('.ibox-content').find('.alert.year').addClass('d-none');
    }
});


toastr.options = {
    closeButton: true,
    debug: false,
    progressBar: false,
    preventDuplicates: false,
    positionClass: "toast-top-right",
    onclick: null,
    showDuration: 400,
    hideDuration: 400,
    timeOut: 7000,
    extendedTimeOut: 1000,
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
};

$(document).ready(function () {
    $('.tooltip-init').tooltip();
});

$(document).ready(function () {
    const $stickyTrial = $('.sticky-trial');

    if ($stickyTrial.length > 0) {
        const position = $stickyTrial.offset().top;

        $(window).scroll(function () {
            if ($(window).scrollTop() >= position) {
                $stickyTrial.css('top', $(window).scrollTop() - 157); // 157 = height of rows above upgrade element
            }
        });
    }
});

$(window).scroll(function() {

    if ($(window).scrollTop() >= 140 ) { // 140px it's height of logo and header

        $('#side-menu').addClass('fixed-at-top');

    } else {

        $('#side-menu').removeClass('fixed-at-top');

    }

});