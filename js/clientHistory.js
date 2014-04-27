$.getJSON('/-api/heartbeats', function(data) {

    var parsedData = [];
    $.each(data, function(elem) {
        parsedData.push([new Date(data[elem].ts), data[elem].val]);
    });

    // Create a timer
    var start = + new Date();

    // Create the chart
    $('#placeholder').highcharts('StockChart', {
        chart: {
            zoomType: 'x'
        },

        rangeSelector: {
            inputEnabled: $('#placeholder').width() > 480,
            buttons: [{
                type: 'day',
                count: 3,
                text: '3d'
            }, {
                type: 'week',
                count: 1,
                text: '1w'
            }, {
                type: 'month',
                count: 1,
                text: '1m'
            }, {
                type: 'month',
                count: 6,
                text: '6m'
            }, {
                type: 'year',
                count: 1,
                text: '1y'
            }, {
                type: 'all',
                text: 'All'
            }],
            selected: 3
        },

        yAxis: {
            // title: {
            //     text: 'Temperature (°C)'
            // }
        },

        title: {
            text: 'Heartbeat history data'
        },

        // subtitle: {
        //     text: 'Built chart in ...' // dummy text to reserve space for dynamic subtitle
        // },

        series: [{
            name: null,
            data: parsedData,
            tooltip: null
        }]

    });
});