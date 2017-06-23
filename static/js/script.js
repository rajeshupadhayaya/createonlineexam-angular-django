/* ajax to get send mail and get response*/
$(document).ready(function(){
	logo=function(e){
		location.reload();
    };

/////////////////////////////Mail Function////////////////////////////////////////////
//	sendMessage=function(){
//        //disableFunction('submitButton');
//        var name = $("#name").val();
//        var email = $("#email").val();
//        var message = $("#message").val();
//        if (name == '' || email== '' || message == ''){
//
//            $.notify(
//                "Please fill all inputs",
//                {position: "top center"}
//            );
//
//            //$(".submitBtn").attr("disabled", false);
//
//
//
//        }else {
//            submitDisable();
//            var formData = $('#douhavesuggestion').serializeObject();
//            $.ajax({
//                url:"mail.php",
//                method:"POST",
//                data:formData,
//                success:function(xhr, response, options){
//                    console.log(xhr);
//                    $('#douhavesuggestion')[0].reset();
//                    $.notify(
//                        xhr,
//                        {position: "top center",
//                         className: "success"}
//                    );
//                    $(".submitBtn").attr("disabled", false);
//
//                },
//                error:function(xhr, response, options){
//                    $('#douhavesuggestion')[0].reset();
//                    $.notify(response, "error");
//                    $(".submitBtn").attr("disabled", false);
//                }
//            });
//        }
//        //document.getElementById('submitButton').disabled = 'false';
//    };

    //Check to see if the window is top if not then display button
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });

    //click to scroll to top
    $('.scrollToTop').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });



});

///////////////////////////////// Serialize function for ajax///////////////////////////////////////////
/*Serialize object function, included in this file only to minimize the script loading at DOM creation*/
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

///////////////////////////lazy loading///////////////////////////////
 $(function() {
     $("img.lazy").lazyload();
 });



//hide results when clicked outside of search field

$("body").click(function() {
    $("#searchResults").removeClass("show").addClass("hide");
});


window.searchListIndex = -1;
$('#examName').keyup(function(e) {

    switch (e.keyCode) {
        // User pressed "up" arrow
        case 38:
            Navigate(-1);
            break;
        // User pressed "down" arrow
        case 40:
            Navigate(1);
            break;
        // User pressed "enter"
        case 13:
            if (examName.value == ''){
                //e.preventDefault();
                return false;
            } else{
                if (currentUrl != '') {
                    window.location = currentUrl;
                }
            }

            break;
        case 27:
            //$("#searchResults").hide();
            $("#searchResults").removeClass("show");
            $("#searchResults").addClass("hide");
            break;

        default:
            window.searchListIndex = -1;
            //$("#searchResults").show();
            $("#searchResults").removeClass("hide");
            $("#searchResults").addClass("show");
            var formData = $('#search_form').serializeObject();
            $.ajax({
                url:"../ajax/search.inc.php",
                method:"POST",
                data:formData,
                success:function(xhr, response, options){

                    //$('#search_form')[0].reset();
                    $('#searchResults').html(xhr);
                    //$('#searchResults').html[0].reset();
                },
                error:function(xhr, response, options){
                    $('#search_form')[0].reset();
                    $('#searchResults').html(response);
                }
            });
    }

});

var Navigate = function(diff) {
    searchListIndex += diff;
    var searchList = $(".search-list");
    if (searchListIndex >= searchList.length)
        searchListIndex = 0;
    if (searchListIndex < 0)
        searchListIndex = searchList.length - 1;
    var cssClass = "search-list-hover";
    searchList.removeClass(cssClass).eq(searchListIndex).addClass(cssClass);
    var textSelect = searchList.eq(searchListIndex).text();
    $("#examName").val(textSelect);
}

/////////////////////Profile editable///////////////////////////////////
$('#editme').click(function(){

});
$("#uploadimage").on('submit',function(e)
{
    e.preventDefault();
    $(this).ajaxSubmit(

        {
            beforeSend:function()
            {
                $("#prog").show();
                $("#prog").attr('value','0');

            },
            uploadProgress:function(event,position,total,percentCompelete)
            {
                $("#prog").attr('value',percentCompelete);
                $("#percent").html(percentCompelete+'%');
            },
            success:function(data)
            {
                $("#here").html(data);
            }
        });
});
