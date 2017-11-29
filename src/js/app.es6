import 'bootstrap-less/js/modal.js';
import  '../less/main.less';

window.$$ = window.$$ || {};

function calculateScroll() {
    const header = $('.js-sticky-element');
    let activeState = false;

    $(document).on('scroll', (event) => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (activeState === false && scrollTop > 200) {
            header.addClass('visible');
            activeState = true;
        }

        if (activeState === true && scrollTop < 200) {
            header.removeClass('visible');
            activeState = false;
        }
    });
}

$(function() {
    $$.window = $(window);
	$$.body = $('body');
    $$.html = $('html');
    let formModal = $('#form-modal');
    let successModal = $('#success-modal');

    function initModals(modal1, modal2) {
        formModal.modal({show: false});
        successModal.modal({show: false});
    }
    
    function bindEvents() {
        const form = $('.js-form');
        const modalTrigger = $('.js-modal-trigger');
    
        form.on('submit', (event) => {
            event.preventDefault();
            
            formModal.modal('hide');
            successModal.modal('show');
        });

        modalTrigger.on('click', () => {
            formModal.modal('show');
        });
    }

    calculateScroll();
    initModals();
    bindEvents();
});
