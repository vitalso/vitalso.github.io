$(function() {

    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{ label: "Some label", value: 12 },
            { label: "+100% to +900%", value: 20 },
            { label: "Another label", value: 8 } ],
        resize: true,
        colors: ['#F8AC59', '#1AB394','#1C84C6'],
    });

    Morris.Donut({
        element: 'morris-donut-chart-2',
        data: [{ label: "Some label", value: 12 },
            { label: "+90%", value: 20 },
            { label: "Another label", value: 8 } ],
        resize: true,
        colors: ['#F8AC59', '#1AB394','#1C84C6'],
    });

    Morris.Donut({
        element: 'morris-donut-chart-3',
        data: [{ label: "Some label", value: 12 },
            { label: "+100% to +900%", value: 20 },
            { label: "Another label", value: 8 } ],
        resize: true,
        colors: ['#F8AC59', '#1AB394','#1C84C6'],
    });

    Morris.Donut({
        element: 'morris-donut-chart-4',
        data: [{ label: "Some label", value: 12 },
            { label: "+90%", value: 20 },
            { label: "Another label", value: 8 } ],
        resize: true,
        colors: ['#F8AC59', '#1AB394','#1C84C6'],
    });

});
