(function ($) {
    "use strict"; // Start of use strict

    // Stop videos when modal closes.
    // BEST ANSWER ON STACK OVERFLOW
    // https://stackoverflow.com/a/66014515/5877570
    // any modals with embedded <iframe> we can assume need reset
    $('body').on('hide.bs.modal', '.modal', function () {
        const $modal = $(this);
        // return early if there were no embedded YouTube videos
        if ($modal.find('iframe').length === 0) return;
        const html = $modal.html();
        $modal.html(html);
    });
})(jQuery); // End of use strict
