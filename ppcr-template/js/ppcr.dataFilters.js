(function(ppcr) {
	
	ppcr.dataFilters = {
    	
    	target: null,
    	
    	configPath: null,
    	
    	filterConfig: null,
    	
    	contentElement: null,
    	
    	init: function(target, configPath, filterConfig, contentElement) {
    		
    		ppcr.dataFilters.target = target;
    		ppcr.dataFilters.configPath = configPath;
    		ppcr.dataFilters.filterConfig = filterConfig;
    		ppcr.dataFilters.contentElement = contentElement;
    		
    		// Add filter modal actions
    		$("#filter-modal").on("hidden.bs.modal", function() {
    			$("#filter-property").val(null).trigger("change");
    			$("#filter-operator").val(null).trigger("change");
    			$("#filter-column-value").empty().hide();
    			$("#filter-column-operator").hide();
    		});

    		// Add filter properties
    		for (var p in ppcr.dataFilters.filterConfig.properties) {
    			$("#filter-property").append($("<option>").attr("value", p).text(ppcr.dataFilters.filterConfig.properties[p].label));
    		}

    		// Add select2
    		$("#filter-property,#filter-operator").select2({
    			minimumResultsForSearch: Infinity,
    			containerCssClass: 'select2-modal-container',
    			dropdownCssClass: 'select2-modal-dropdown'
    		});

    		// Create filter value field
    		$("#filter-property").on("change", ppcr.dataFilters.changeProperty);

    		$("#filter-operator").on("change", function() {
    			$("#filter-error").empty();
    			$("#filter-value").toggleClass("hidden", $(this).val() == "empty");
    		});

    		$("#filter-form").on("submit", function() {		
    			var $form = $(this);

    			// Load filter parameters
    			var property = $("#filter-property").val();
    			var operator = $("#filter-operator").val();
    			var value = $("#filter-value").val();

    			// Check property
    			if (property == "" || !ppcr.dataFilters.filterConfig.properties.hasOwnProperty(property)) {
    				$("#filter-error").text($("#filter-modal").data("error-select-property"));
    				return false;
    			}

    			// Load property config
    			var propertyConfig = ppcr.dataFilters.filterConfig.properties[property];

    			// Set checkbox value
    			if ($("#filter-value").is("[type='checkbox']")) {
    				value = $("#filter-value").prop("checked") ? 1 : 0;
    			}
    			
    			// Set empty value
    			if (operator == "empty") {
    				value = 1;
    			}

    			// Check operator
    			if (propertyConfig.operator != false && (operator == "" || !ppcr.dataFilters.filterConfig.operators[propertyConfig.operator].hasOwnProperty(operator))) {
    				$("#filter-error").text($("#filter-modal").data("error-select-operator"));
    				return false;
    			}

    			// Check value
    			if (value === "" || value === null || ($.isArray(value) && value.length == 0)) {
    				$("#filter-error").text($("#filter-modal").data("error-select-value"));
    				return false;
    			} 
    			if ($("#filter-value").is("[min]") && parseFloat($("#filter-value").val()) < parseFloat($("#filter-value").attr("min"))) {
    				$("#filter-error").text($("#filter-modal").data("error-min").replace(/_min_/, $("#filter-value").attr("min")));
    				return false;
    			}
    			if ($("#filter-value").is("[max]") && parseFloat($("#filter-value").val()) > parseFloat($("#filter-value").attr("max"))) {
    				$("#filter-error").text($("#filter-modal").data("error-min").replace(/_max_/, $("#filter-value").attr("max")));
    				return false;
    			}

    			// Create filter box
    			ppcr.dataFilters.add({"property":property, "operator":operator, "value":value}, $form.data("target"));

    			$("#filter-modal").modal("hide");

    			// Apply the filter
    			ppcr.dataFilters.apply();
    			
    			return false;
    		});

    		// Remove filter
    		$("#filter-box-container").on("click", ".filter-delete", function() {
    			$(this).closest(".filter-box").remove();
    			ppcr.dataFilters.apply();
    		});

            // Apply data filter
            $(".dropdown-data-filter .dropdown-menu").on("click", "a.data-filter", function() {
                ppcr.showPageLoader();
                var targetElement = $(this).closest(".dropdown").data("target");

                // Log data being sent
                console.log("Sending target:", ppcr.dataFilters.target);
                console.log("Sending filter ID:", $(this).data("filter-id"));

                $.post("/data-filters/get.json", {target:ppcr.dataFilters.target, id:$(this).data("filter-id")}).done(function(response) {
                    console.log("Response from server:", response);

                    $(targetElement).empty();
                    console.log(':::::::dom-before-:::::');
                    $.each(response, function(index, filter) {
                        console.log("...add filter loop:", filter);
                        ppcr.dataFilters.add(filter, targetElement);
                    });
                    console.log(':::::::dom-after-:::::');
                    // Log the state of ppcr.dataFilters after adding the filter
                    console.log("After adding filter:", ppcr.dataFilters);
                    ppcr.hidePageLoader();
                    ppcr.dataFilters.apply();
                }).fail(ppcr.ajaxFail);
                $(this).closest(".dropdown").find(".dropdown-toggle").dropdown("toggle");
                return false;
            });


            // Show data filter modal
    		$("#filter-box-container .save-new-filter").on("click", function() {
    			var filter = ppcr.dataFilters.get();
    			if (filter.length > 0) {
    				$("#save-filter-overwrite").val("0");
    				$("#save-filter-name").val("");
    	    		$("#save-filter-modal").modal("show");
    			}
    			else {
    				ppcr.alert("danger", {message:$(this).data("error-no-filter")});
    			}
    			$(this).closest(".dropdown").find(".dropdown-toggle").dropdown("toggle");
    			return false;
    		});

    		// Save data filter
            $("#save-filter-form").on("submit", function(event) {
                event.preventDefault();  // Prevent default form submission
                ppcr.showPageLoader();

                $.post("/data-filters/save.json", {
                    target: ppcr.dataFilters.target,
                    name: $("#save-filter-name").val(),
                    overwrite: $("#save-filter-overwrite").val(),
                    filter: ppcr.dataFilters.get()
                }).done(function(response) {
                    ppcr.hidePageLoader();
                    console.log(response);

                    if (response.status === 'success') {
                        window.location.reload();  // Reload the page to display the flash message
                    } else if (response.status === 'error') {
                        ppcr.alert("error", {message: response.message});
                    }
                }).fail(ppcr.ajaxFail);
            });


        },
    	
    	/**
    	 * Change property in modal dialog
    	 */
    	changeProperty: function() {

			$("#filter-error").empty();
			if ($(this).val() == "") {
				return;
			}
			var propertyConfig = ppcr.dataFilters.filterConfig.properties[$(this).val()];
			$("#filter-operator").empty();
			if (propertyConfig.operator != false) {
	    		for (var operatorName in ppcr.dataFilters.filterConfig.operators[propertyConfig.operator]) {
	        		$("#filter-operator").append($("<option>").attr("value", operatorName).text(ppcr.dataFilters.filterConfig.operators[propertyConfig.operator][operatorName].sign));
	        	}
			}
			$("#filter-operator").trigger("change");
			$("#filter-column-operator").toggle(propertyConfig.operator != false);
			$("#filter-column-value").removeClass(function(index, className) {
				return (className.match(/\bcol-md-\d+/g) || []).join(' ');
			}).addClass("col-md-" + (propertyConfig.operator ? 4 : 8)).empty().show();

			var $input = $("<" + propertyConfig.tag + ">").attr("id", "filter-value").addClass("form-control").attr(propertyConfig.attributes);
			if (propertyConfig.tag == "select" && propertyConfig.options) {
				for (var o in propertyConfig.options) {
					$("<option>").attr("value", o).text(propertyConfig.options[o]).appendTo($input);
				}
			}
			if (propertyConfig.addon == "datepicker") {
				$input.datepicker({
					autoclose: true
				});
			}
			$input.appendTo("#filter-column-value");
			if (propertyConfig.addon == "select2") {
				$input.select2({
					minimumResultsForSearch: Infinity,
					containerCssClass: 'select2-modal-container',
					dropdownCssClass: 'select2-modal-dropdown'
				});
			}
			else if (propertyConfig.addon == "switch") {
				if (propertyConfig.offText) {
					$input.before($("<label>").attr("for", "filter-value").addClass("checkbox-label").text(propertyConfig.offText));
				}
				$input.addClass("css-checkbox");
				if (propertyConfig.onText) {
					$input.after($("<label>").attr("for", "filter-value").addClass("checkbox-label").text(propertyConfig.onText));
				}
				$input.after($("<label>").attr("for", "filter-value"));
			}
			
			$input.on("keyup change", function() {
				$("#filter-error").empty();
			});
		
    	},
    	
    	/**
		 * Add a new filter to the box
		 */
    	add: function(filter, targetElement) {
    		
    		// Load property config
    		var propertyConfig = ppcr.dataFilters.filterConfig.properties[filter.property];
    		
    		// Determine display value
    		filter.displayValue = "";
    		if (ppcr.dataFilters.filterConfig.properties[filter.property].attributes.type && ppcr.dataFilters.filterConfig.properties[filter.property].attributes.type == "checkbox") {
    			filter.displayValue = propertyConfig[(filter.value ? "on" : "off") + "Text"];
    		}
    		else if ($.isArray(filter.value)) {
    			var displayValues = [];
    			$.each(filter.value, function(i, v) {
    				displayValues.push(ppcr.dataFilters.getDisplayValue(propertyConfig, v));
    			});
    			filter.displayValue = displayValues.join(", ");
    		}
    		else if (filter.operator != "empty") {
    			filter.displayValue = ppcr.dataFilters.getDisplayValue(propertyConfig, filter.value);
    		}
    		
    		var boxText = propertyConfig.label + ": ";
    		if (propertyConfig.operator != false) {
    			boxText += ppcr.dataFilters.filterConfig.operators[propertyConfig.operator][filter.operator].sign + " ";
    		}
    		boxText += filter.displayValue;
    		
    		$("<span>").addClass("filter-box")
    	    	.text(boxText)
    	    	.append($("<i>").addClass("fa fa-times fa-border filter-delete"))
    	    	.data("property", filter.property).data("operator", filter.operator).data("value", filter.value)
    	    	.appendTo(targetElement);
    	},
    	
    	getDisplayValue(propertyConfig, value) {
    		// Return display values of options
    		if (propertyConfig.hasOwnProperty('options')) {
    			return propertyConfig['options'][value];
    		}
    		// Return origin value
    		return value;
    	},
    	
    	/**
		 * Collect all filters
		 */
    	get: function() {
    		var filter = [];
    		$("#filter-box-container").find(".filter-box").each(function(i, e) {
    			filter.push({
    				property: $(this).data("property"),
    				operator: $(this).data("operator"),
    				value: $(this).data("value"),
    			});
    		});
    		return filter;
    	},

    	/**
		 * Apply the filter
		 */
        apply: function() {
            // Debugging the data being sent in the AJAX request
            console.log("Sending filter:", ppcr.dataFilters.get());
            console.log("Sending target:", ppcr.dataFilters.target);
            console.log("Sending configPath:", ppcr.dataFilters.configPath);
            $.post("/data-filters/apply.json", {
                filter: ppcr.dataFilters.get(),
                target: ppcr.dataFilters.target,
                configPath: ppcr.dataFilters.configPath
            }).done(function(response) {
                console.log("Response from server:", response); // Debugging the response

                if (ppcr.dataFilters.contentElement != null) {
                    if (typeof ppcr.dataFilters.contentElement == "string") {
                        ppcr.showPageLoader();
                        location.href = ppcr.dataFilters.contentElement;
                    } else {
                        $("<a>").attr("href", ppcr.dataFilters.contentElement.data("url"))
                                .appendTo(ppcr.dataFilters.contentElement.find(".loader-content"))
                                .trigger("click");
                    }
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.error("AJAX request failed:", textStatus, errorThrown); // Debugging AJAX failure
            });
        }


    };
	
})(ppcr);