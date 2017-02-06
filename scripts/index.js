$(function() {

    $(".header_right").html(moment().format('YYYY年MM月DD'));

    window.control
        .addPage(new SummaryPage())
        .addPage(new SalePage())
        .addPage(new PredictPage())
        .start();
});
