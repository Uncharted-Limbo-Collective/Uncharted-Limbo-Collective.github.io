(function ($) {
    "use strict"; // Start of use strict

// any modals with embedded <iframe> we can assume need reset
// <https://stackoverflow.com/a/52315492>
//
    $('body').on('hide.bs.modal', '.modal', function () {
        const $modal = $(this);
        // return early if there were no embedded YouTube videos
        if ($modal.find('iframe').length === 0) return;
        const html = $modal.html();
        $modal.html(html);
    });
})(jQuery); // End of use strict
