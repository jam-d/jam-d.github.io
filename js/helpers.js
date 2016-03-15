/*
This code extends jQuery to include:
- load(worksheet, query, action) - queries W for Q, performs A on result data
- load_scroll() - attaches a scroll click action to class .scoll, auto-loads
- load_header(id) - auto-loads with each page, ID is the page id (0-indexed)
- load_footer() - auto-loads footer on bottom of each page, no page_id highlight
*/

// spreadsheet keys (IDs) for each sheet
var sheet_keys = {
    // photos and videos
    'Photos': '1lPcj8dsNMAyLPAZNLbn0gegy-JEZXlp7cAMaUCJAHUc',
    // universal
    'Header': '17ETi0DMXD2x_9DmIpKzl35X-dH3QjUHDhQKWk8PGvTU',
    'Footer': '14dMokB5uKpSAryriGqSobj3My7ZIdPP3k7fQuC-0h6Q',
    // pages
    'Contact_Page': '1gfxZJeIpBbE1alsyl4JlhRVDdLVEQugOJQRln87wG1Q',
    'Teachers_Page': '1Nz8anZO2MGqo8Bgvmo--k-cHaGtXXDGaLvNByaw3t4c',
    // teachers
    'Teachers': '1wsuXvMr7HHozEeqeVlsw3Ss8d3o6KbHQqlC4rfG8UT8',
    // courses
    'Fake_Courses': '1RpQzjDGrj7gzp7ENNPU7y5SVOdHhJD7ducsft0f9KDA'
}

// generates query URL, gets data, converts to JSON object, executes action
function execute(worksheet_name, action) {
    Tabletop.init({
        key: sheet_keys[worksheet_name],
        callback: function(data, tabletop) {
            action(data);
        },
        simpleSheet: true
    });
}

// to extract JSON data
jQuery.extend( jQuery,
{
    // $.load calls execute
    load: execute,

    // scroll to top of page if click on element with class scroll
    load_scroll: function() {
        $('.scroll').click(function(event) {
            event.preventDefault();
            $('html,body').animate({scrollTop:$(this.hash).offset().top}, 1000);
        });
    },

    // header, pass in 0 for home, 1 for about, 2 for teachers ... 5 for contact
    load_header: function(pg_id) {
        $('body').prepend(
            '<div class="header">' +

                // top-header: slogan, login/ signup, and social icons
                '<div class="top-header">' +
                    '<div class="container">' +
                        '<div class="top-header-info">' +

                            // slogan
                            '<div class="top-header-left wow fadeInLeft ' +
                            'animated" data-wow-delay=".5s" id="slogan_div">' +
                                '<p><a href="index.html" ' +
                                'id="header_top_header_david_slogan"></a></p>' +
                            '</div>' +

                            // login/ signup and social icons
                            '<div class="top-header-right wow fadeInRight ' +
                            'animated" data-wow-delay=".5s">' +
                                '<div class="top-header-right-info">' +
                                    '<ul>' +
                                        '<li><a href="login.html" ' +
                                        'id="login_translation"></a></li>' +
                                        '<li><a href="signup.html" ' +
                                        'id="signup_translation"></a></li>' +
                                    '</ul>' +
                                '</div>' +
                                '<div class="social-icons">' +
                                    '<ul>' +
                                        '<li><a class="twitter" ' +
                                        'id="twitter_url" target="_blank">' +
                                            '<i class="fa fa-twitter"></i>' +
                                        '</a></li>' +
                                        '<li><a class="twitter facebook" ' +
                                        'id="facebook_url" target="_blank">' +
                                            '<i class="fa fa-facebook"></i>' +
                                        '</a></li>' +
                                        '<li><a class="twitter google" ' +
                                        'id="youtube_url" target="_blank">' +
                                            '<i class="fa fa-youtube"></i>' +
                                        '</a></li>' +
                                    '</ul>' +
                                '</div>' +
                                '<div class="clearfix"> </div>' +
                            '</div>' +
                            '<div class="clearfix"> </div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

                // bottom-header: logo, navbar tabs
                '<div class="bottom-header">' +
                    '<div class="container">' +

                        // logo
                        '<div class="logo wow fadeInDown animated" ' +
                        'data-wow-delay=".5s">' +
                            '<h1><a href="index.html"><img id="logo_photo" ' +
                            'alt="" /></a></h1>' +
                        '</div>' +

                        // navbar
                        '<div class="top-nav wow fadeInRight animated" ' +
                        'data-wow-delay=".5s">' +
                            '<nav class="navbar navbar-default">' +

                                // name of navigation menu if on phone
                                '<div class="container">' +
                                    '<button type="button" id="header_menu_' +
                                    'name" class="navbar-toggle collapsed" ' +
                                    'data-toggle="collapse" data-target="' +
                                    '#bs-example-navbar-collapse-1"></button>' +
                                '</div>' +

                                // navigation tab names
                                '<div class="collapse navbar-collapse" ' +
                                'id="bs-example-navbar-collapse-1">' +
                                    '<ul class="nav navbar-nav">' +
                                        '<li><a href="index.html" ' +
                                        (pg_id === 0 ? 'class="active" ' : '') +
                                        'id="header_home_tab"></a></li>' +

                                        '<li><a href="about.html" ' +
                                        (pg_id === 1 ? 'class="active" ' : '') +
                                        'id="header_about_tab"></a></li>' +

                                        '<li><a href="teachers.html" ' +
                                        (pg_id === 2 ? 'class="active" ' : '') +
                                        'id="header_teachers_tab"></a></li>' +
/*
                                        '<li><a href="#" class="' +
                                            (pg_id === 3 ? 'active ' : '') +
                                            'dropdown-toggle ' +
                                            'hvr-bounce-to-bottom" ' +
                                        'data-toggle="dropdown" ' +
                                        'role="button" aria-haspopup="true" ' +
                                        'aria-expanded="false" ' +
                                        'id="header_courses_schools_tab">' +
                                        '<span class="caret"></span></a>' +
                                            '<ul class="dropdown-menu">' +
                                                '<li><a href="courses.html" c' +
                                                'lass="hvr-bounce-to-bottom" ' +
                                                'id="header_courses_sub_tab" ' +
                                                '</a></li>' +
                                                '<li><a href="schools.html" c' +
                                                'lass="hvr-bounce-to-bottom" ' +
                                                'id="header_schools_sub_tab" ' +
                                                '</a></li>' +
                                            '</ul>' +
                                        '</li>' +*/
                                        '<li><a href="schools.html" ' +
                                        (pg_id === 3 ? 'class="active" ' : '') +
                                        'id="header_news_tab"></a></li>' +
                                        '<li><a href="contact.html" ' +
                                        (pg_id === 5 ? 'class="active" ' : '') +
                                        'id="header_contact_tab"></a></li>' +
                                    '</ul>' +
                                    '<div class="clearfix"> </div>' +
                                '</div>' +
                            '</nav>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
        execute('Header', function(d) {
            execute('Photos', function(p) {
                $('#logo_photo').prop('src', p[d[0].value - 1].image_url);
                $('#header_top_header_david_slogan').append(d[1].value);
                $('#login_translation').append(d[2].value);
                $('#signup_translation').append(d[3].value);
                $('#twitter_url').prop('href', d[4].value);
                $('#facebook_url').prop('href', d[5].value);
                $('#youtube_url').prop('href', d[6].value);
                $('#header_menu_name').append(d[7].value);
                $('#header_home_tab').append(d[8].value);
                $('#header_about_tab').append(d[9].value);
                $('#header_teachers_tab').append(d[10].value);
/*                $('#header_courses_schools_tab').prepend(d[11].value);
                $('#header_courses_sub_tab').append(d[12].value);
                $('#header_schools_sub_tab').append(d[13].value);*/
                $('#header_news_tab').append(d[11].value);
                $('#header_contact_tab').append(d[15].value);
            });
        });
    },

    // loads the footer onto bottom of the page
    load_footer: function() {
        var current_year = new Date().getFullYear();
        $('body').append(
            '<div class="footer">' +
                '<div class="container">' +
                    '<div class="footer-grids">' +

                        // left panel: sitemap (3 cols)
                        '<div class="col-md-3 footer-nav wow fadeInLeft ' +
                        'animated" data-wow-delay=".5s">' +
                            '<h4 id="footer_menu_name"></h4>' +
                            '<ul>' +
                                '<li><a href="about.html" ' +
                                'id="footer_about_tab"></a></li>' +
                                '<li><a href="teachers.html" ' +
                                'id="footer_teachers_tab"></a></li>' +
                                '<li><a href="schools.html" ' +
                                'id="footer_courses_schools_tab"></a></li>' +
/*                                '<li><a href="blog.html" ' +
                                'id="footer_news_tab"></a></li>' +*/
                                '<li><a href="contact.html" ' +
                                'id="footer_contact_tab"></a></li>' +
                            '</ul>' +
                        '</div>' +

                        // middle panel: newsletter subscription (5 cols)
                        '<div class="col-md-5 footer-nav wow fadeInUp ' +
                        'animated" data-wow-delay=".5s">' +
                            '<h4 id="newsletter_title"></h4>' +
                            '<p id="instruction"></p>' +
                            '<form>' +
                                '<input type="email" id="subscription_email" ' +
                                'name="EMAIL" required=""><input type=' +
                                '"submit" id="subscription_submit">' +
                            '</form>' +
                        '</div>' +

                        // right panel: latest news (4 cols)
                        '<div class="col-md-4 footer-nav wow fadeInRight ' +
                        'animated" data-wow-delay=".5s">' +
                            '<h4 id="latest_news_translation"></h4>' +
                            '<div class="news-grids">' +
                                '<div class="news-grid" id="news_articles">' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="clearfix"> </div>' +
                    '</div>' +

                    // copyright
                    '<div class="copyright wow fadeInUp animated" ' +
                    'data-wow-delay=".5s">' +
                        '<p>© 2015-' + current_year + ' 大衛美語 ' +
                        'David&rsquo;s English Center . ' +
                        'All Rights Reserved . Design by <a href="http://' +
                        'www.mahr.xyz" target="_blank">Jason Mahr</a></p>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );
        execute('Header', function(d) {
            $('#footer_menu_name').append(d[7].value);
            $('#footer_about_tab').append(d[9].value);
            $('#footer_teachers_tab').append(d[10].value);
            $('#footer_courses_schools_tab').append(d[11].value);
            $('#footer_contact_tab').append(d[15].value);
        });
        execute('Footer', function(d) {
            // populate the fields above
            $('#newsletter_title').append(d[0].value);
            $('#instruction').append(d[1].value);
            $('#subscription_email').prop('placeholder', d[2].value);
            $('#subscription_submit').prop('value', d[3].value);
            $('#latest_news_translation').append(d[4].value);
            var last_article_date_row = d[5].value * 3 + 3;
            if (last_article_date_row >= 6) {
                var all_current_year = true;
                for (var i = 6; i <= last_article_date_row; i += 3) {
                    if (d[i].year !== current_year)
                        all_current_year = false;
                }
                function format_date_row(r) {
                    return (all_current_year ? '' : r.year + '年') +
                        (r.month <= 9 ? '0' : '') + r.month + '月' +
                        (r.day <= 9 ? '0' : '') + r.day + '日：';
                }
                for (var i = 6; i <= last_article_date_row; i += 3) {
                    $('#news_articles').append(
                        '<h6>' + format_date_row(d[i]) + '<a href="' +
                        d[i + 2].value + '" target="_blank">' +
                        d[i + 1].value + '</a></h6>'
                    );
                }
            } else {
                $('#news_articles').append(d[24].value);
            }
        });
    },

    // API key for https://developers.google.com/maps/documentation/embed/guide
    get_google_maps_API_key: function() {
        return "AIzaSyDMgRxAIrusMSdX3eiBkxg8HZyPED2kgF8";
    }
});
