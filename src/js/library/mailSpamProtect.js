(function($){
    /*--------------------------------------------------------------------------------------
        文字列を文字コードにして配列として返す
    --------------------------------------------------------------------------------------*/
    $.returnCharCodeArray = function(convertString){
        var charCodeStringArray = [],
            splitConvertString = convertString.split("");

        $.each(splitConvertString, function(val){
            charCodeStringArray.push(convertString.charCodeAt(val));
        });

        return charCodeStringArray;
    };

    /*--------------------------------------------------------------------------------------
        文字コードの配列にしたメールアドレスを要素のhrefに設定する
    --------------------------------------------------------------------------------------*/
    $.fn.setRevertMailAddressLink = function(charCodeMailAddress, textInsertFlag){
        var mailAddress = "";

        $.each(charCodeMailAddress, function(i, val){
            mailAddress += String.fromCharCode(val);
        });

        this.attr("href", "mai" + "lto:" + mailAddress);

        if(textInsertFlag)
            this.text(mailAddress);
    };
})(jQuery);