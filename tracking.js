buyxingShop = "amazon.com";
if (!window.jQuery) {
    var jqueryLoad = document.createElement("script");
    jqueryLoad.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js");
    jqueryLoad.onload = function() {
        jQuery(document).ready(function(jQuery) {
            //buyxingTrackBtnScript();
            buyxingBtnScript();
            buyxingInputScript();
            if(sessionStorage.getItem("check") == 'Y') {
                buyxingCommon();
            }
            if(sessionStorage.getItem("track_check") == 'Y') {
                buyxingTrack();
            }
            var new_url = location.href;
            // 로그인 체크
            if(new_url.indexOf('amazon.com/ap/signin') >= 0) {
                var arrBuyxingAmazonId = [];
                arrBuyxingAmazonId['dahaejum_017@makeshopncompany.com'] = 'Malltail2009!';
                var email = jQuery('.auth-text-truncate:eq(2)').text().trim();
                if(jQuery('#ap_password').length > 0 && arrBuyxingAmazonId[email]) {
                    //비밀번호
                    jQuery('#ap_password').val(arrBuyxingAmazonId[email]);
                    setTimeout(function() {
                        jQuery('#signInSubmit')[0].click();
                    }, 500);
                }
            }
            if(new_url.indexOf('amazon.com/gp/your-account/order-history') >= 0 || new_url.indexOf('amazon.com/gp/css/order-history') >= 0) {
                if(jQuery("#buyxing_start_page").length > 0) {
                    jQuery("#buyxing_start_page").val(jQuery(".a-selected").text());
                }
            }
        });
    };
    document.body.appendChild(jqueryLoad);
} else {
    jQuery(document).ready(function(jQuery) {
        //buyxingTrackBtnScript();
        buyxingBtnScript();
        buyxingInputScript();
        if(sessionStorage.getItem("check") == 'Y') {
            buyxingCommon();
        }
        if(sessionStorage.getItem("track_check") == 'Y') {
            buyxingTrack();
        }
        var new_url = location.href;
        // 로그인 체크
        if(new_url.indexOf('amazon.com/ap/signin') >= 0) {
            var arrBuyxingAmazonId = [];
            arrBuyxingAmazonId['dahaejum_017@makeshopncompany.com'] = 'Malltail2009!';
            var email = jQuery('.auth-text-truncate:eq(2)').text().trim();
            if(jQuery('#ap_password').length > 0 && arrBuyxingAmazonId[email]) {
                //비밀번호
                jQuery('#ap_password').val(arrBuyxingAmazonId[email]);
                setTimeout(function() {
                    jQuery('#signInSubmit')[0].click();
                }, 500);
            }
        }
        if(new_url.indexOf('amazon.com/gp/your-account/order-history') >= 0 || new_url.indexOf('amazon.com/gp/css/order-history') >= 0) {
            if(jQuery("#buyxing_start_page").length > 0) {
                jQuery("#buyxing_start_page").val(jQuery(".a-selected").text());
            }
        }
    });
}

function buyxingCommon() {
    jQuery(document).ready(function(jQuery) {
        var new_url = location.href;

        //오더 히스토리
        if(new_url.indexOf('amazon.com/gp/your-account/order-history') >= 0 || new_url.indexOf('amazon.com/gp/css/order-history') >= 0) {
            var sel_num = jQuery(".a-selected").text();
            var last_num = jQuery(".a-last").prev().text();

            if(sessionStorage.getItem("end_num")) {
                jQuery("#buyxing_end_page").val(sessionStorage.getItem("end_num"));
            }
            if(jQuery("#buyxing_end_page").length > 0 && jQuery("#buyxing_end_page").val()) {
                last_num = jQuery("#buyxing_end_page").val();
            }

            sessionStorage.setItem("start_num", sel_num); // 시작번호
            sessionStorage.setItem("end_num", last_num); // 끝번호
            sessionStorage.setItem("check", "Y"); // 체크

            var orders = '';
            var orders_cnt = '';
            var jbAry = [];

            for(k=0; k<10; k++) {
                jbAry[k] = new Array();
                for(j=0; j<$('.a-box-group:eq('+k+')').find('.a-fixed-left-grid-col.a-col-right').length; j++) {
                    jbAry[k][j] = [
                        $('.a-box-group:eq('+k+')').find('.a-col-right').find('bdi').text(),
                        $('.a-box-group:eq('+k+')').find('.a-fixed-right-grid-col.a-col-left:eq(0)').find('.a-column:eq(0)').find('.a-color-secondary.value').text().trim(),
                        $('.a-box-group:eq('+k+')').find('.a-fixed-left-grid-col.a-col-right:eq('+j+')').find('a:eq(0)').attr('href'),
                        $('.a-box-group:eq('+k+')').find('.a-fixed-left-grid-col.a-col-right:eq('+j+')').closest('.a-box-inner').find('.track-package-button').find('a').attr('href')
                    ];
                }
            }

            if(sessionStorage.getItem("orders") == null) {
                sessionStorage.setItem("orders", JSON.stringify(jbAry)); // 저장
            } else {
                orders = JSON.parse(sessionStorage.getItem("orders"));
                orders_cnt = orders.length;
                for(k=0; k<10; k++) {
                    orders[orders_cnt+k] = new Array();
                    for(j=0; j<$('.a-box-group:eq('+k+')').find('.a-fixed-left-grid-col.a-col-right').length; j++) {
                        orders[orders_cnt+k][j] = [
                            $('.a-box-group:eq('+k+')').find('.a-col-right').find('bdi').text(),
                            $('.a-box-group:eq('+k+')').find('.a-fixed-right-grid-col.a-col-left:eq(0)').find('.a-column:eq(0)').find('.a-color-secondary.value').text().trim(),
                            $('.a-box-group:eq('+k+')').find('.a-fixed-left-grid-col.a-col-right:eq('+j+')').find('a:eq(0)').attr('href'),
                            $('.a-box-group:eq('+k+')').find('.a-fixed-left-grid-col.a-col-right:eq('+j+')').closest('.a-box-inner').find('.track-package-button').find('a').attr('href')
                        ];
                    }
                }
                sessionStorage.setItem("orders", JSON.stringify(orders)); // 저장
            }

            //sessionStorage.clear(); // 전체삭제
            if(sessionStorage.getItem("start_num") != sessionStorage.getItem("end_num")) {
                location.href = 'https://www.amazon.com/gp/your-account/order-history/?ie=UTF8&orderFilter=last30&search=&startIndex='+sessionStorage.getItem("start_num")*10;
            } else {
                buyxingCheckoutScrap(sessionStorage.getItem("orders"));
                //console.log(JSON.parse(sessionStorage.getItem("orders")));
                sessionStorage.removeItem("orders"); // 삭제
                sessionStorage.removeItem("end_num"); // 삭제
                sessionStorage.removeItem("check"); // 삭제
            }

            //console.log(JSON.parse(sessionStorage.getItem("orders")));
        }
    });
}

function buyxingTrack() {
    jQuery(document).ready(function(jQuery) {
        var new_url = location.href;

        if(sessionStorage.getItem("tracking") == null) {
            alert("수집되지 않았습니다.");
        } else {
            track = JSON.parse(sessionStorage.getItem("tracking"));

            //트래킹 내역
            if(new_url.indexOf('amazon.com/progress-tracker/package') >= 0) {
                //console.log(jQuery(".carrierRelatedInfo-trackingId-text").text());
                jQuery.each(track.tracking_url,function(index1, item1){
                    if(sessionStorage.getItem("track_start") == index1) {
                        if(jQuery('.carrierRelatedInfo-trackingId-text').length > 0) {
                            track.tracking[index1] = jQuery(".carrierRelatedInfo-trackingId-text").text();
                        }

                        sessionStorage.setItem("tracking", JSON.stringify(track));
                        if(sessionStorage.getItem("track_start") == (sessionStorage.getItem("track_end")-1)) {
                            sessionStorage.removeItem("track_start"); // 트래킹 시작 삭제
                            sessionStorage.removeItem("track_end"); // 트래킹 끝 삭제
                            sessionStorage.removeItem("track_check"); // 트래킹 체크 삭제
                            buyxingTrackingScrap(sessionStorage.getItem("tracking"));
                            return false;
                        }
                        location.href = 'https://www.amazon.com'+track.tracking_url[index1+1];
                    }
                });
                sessionStorage.setItem("track_start", sessionStorage.getItem("track_start")+1);

            } else if(new_url.indexOf('amazon.com/gp/your-account/order-history') >= 0) {
                var cnt = 0;
                jQuery.each(track.tracking_url,function(index1, item1){
                    cnt++;
                });

                sessionStorage.setItem("track_start", 0);
                sessionStorage.setItem("track_end", cnt);
                if(typeof track.tracking_url !== 'undefined') {
                    location.href = 'https://www.amazon.com'+track.tracking_url[0];
                    sessionStorage.setItem("track_check", "Y"); // 트래킹 체크
                } else {
                    alert('변경할 데이터가 없습니다.');
                    sessionStorage.removeItem("track_check"); // 트래킹 체크 삭제
                }
            }
        }
    });
}

function buyxingCheckoutScrap(content) {
    var target_url  = `${window.location.protocol}//api.kck1024.bbom.org/amazon/get_data`;
    jQuery.ajax({
        type: "POST",
        url: target_url,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        xhrFields: {
            withCredentials: true
        },
        data: {
            data      : content,
            shop      : "amazon.com"
        },
        async: false,
        beforeSend: function() {
        },
        success: function(result) {
            //console.log("success");
            //alert(result.msg);
            sessionStorage.setItem("tracking", JSON.stringify(result.data)); // 저장
            buyxingTrack();
        },
        error: function(result) {
            //console.log("error");
            //console.log(result);
        },
        complete: function() {
        }
    });
}

function buyxingTrackingScrap(content) {
    var target_url  = `${window.location.protocol}//api.kck1024.bbom.org/amazon/set_data`;
    jQuery.ajax({
        type: "POST",
        url: target_url,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        xhrFields: {
            withCredentials: true
        },
        data: {
            data      : content,
            shop      : "amazon.com"
        },
        async: false,
        beforeSend: function() {
        },
        success: function(result) {
            //console.log("success");
            alert(result.msg);
            console.log(result);
        },
        error: function(result) {
            //console.log("error");
            //console.log(result);
        },
        complete: function() {
        }
    });
}


function buyxingBtnScript() {
    var retryHtml = "";

    retryHtml += '<div class="a-button-stack" style="width: 200px;float: right;margin-right: 10px;">';
    retryHtml += '  <span class="a-declarative" data-action="">';
    retryHtml += '      <span class="a-button a-button-base a-button-primary" id="a-autoid-5"><span class="a-button-inner"><a class="a-button-text" role="button" id="buyxing_start" onclick="buyxingCommon()">';
    retryHtml += '          트래킹 수집시작';
    retryHtml += '      </a></span></span>';
    retryHtml += '  </span>';
    retryHtml += '</div>';

    // 시작하기 버튼 생성
    jQuery(".top-controls").append(retryHtml);
}

function buyxingTrackBtnScript() {
    var retryHtml = "";

    retryHtml += '<div class="a-button-stack" style="width: 200px;float: right;">';
    retryHtml += '  <span class="a-declarative" data-action="">';
    retryHtml += '      <span class="a-button a-button-base a-button-primary" id="a-autoid-5"><span class="a-button-inner"><a class="a-button-text" role="button" id="buyxing_end" onclick="buyxingTrack()">';
    retryHtml += '          트래킹 수집이동';
    retryHtml += '      </a></span></span>';
    retryHtml += '  </span>';
    retryHtml += '</div>';

    // 이동하기 버튼 생성
    jQuery(".top-controls").append(retryHtml);
}

function buyxingInputScript() {
    var retryHtml = "";
    retryHtml += '<div class="a-column a-span-last" style="margin-right: 10px;">';
    retryHtml += '  <div class="a-row field-container">';
    retryHtml += '      <div class=""><input type="input" id="buyxing_start_page" placeholder="시작페이지" name="buyxing_start_page" class="a-input-text field" readonly> ~ <input type="input" id="buyxing_end_page" placeholder="끝페이지" name="buyxing_end_page" class="a-input-text field"></div>';
    retryHtml += '  </div>';
    retryHtml += '</div>';

    jQuery(".top-controls").append(retryHtml);
}