import { H, showLoader, hideLoader, initHeader, __html, initBreadcrumbs, parseApiError, link } from '@kenzap/k-cloud';
import { HTMLContent } from "../_/_cnt_home.js"
import { initFooter } from "../_/_helpers.js"

/**
 * Main navigation menu page of the dashboard.
 * Loads HTMLContent from _cnt_home.js file.
 * Renders menu items in a list view manner
 * 
 * @version 1.0
 */
class Menu {
    
    // construct class
    constructor(){
        
        this.state = {
            firstLoad: true,
            ajaxQueue: 0 
        };
    
        // connect to backend
        this.getData();
    }

    /**
     * Get data from the cloud and authenticate the user.
     * Load translation strings.
     * Get any additional data by extending the query object.
     * 
     * @version 1.0
     * @link https://developer.kenzap.cloud/
     */
    getData = () => {

        // show loader during first load
        if (this.state.firstLoad) showLoader();

        // do API query
        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: H(),
            body: JSON.stringify({
                query: {
                    locale: {
                        type:       'locale',
                        source:      ['extension'],
                        key:         'ecommerce',
                    }
                }
            })
        })
        .then(response => response.json())
        .then(response => {

            // hide UI loader
            hideLoader();

            if(response.success){

                // init header
                initHeader(response);

                // get core html content 
                this.html();  

                // render table
                this.render(response);

                // initiate footer
                initFooter(this);

                // first load
                this.state.firstLoad = false;

            }else{

                parseApiError(response);
            }
        })
        .catch(error => { parseApiError(error); });
    }

    // load page
    html = () => {

        if(!this.state.firstLoad) return;

        // get core html content 
        document.querySelector('#contents').innerHTML = HTMLContent();
    }

    // render page
    render = (product) => {

        // initiate breadcrumbs
        initBreadcrumbs(
            [
                { link: link('https://dashboard.kenzap.cloud'), text: __('Home') },
                { text: __('E-commerce') },
            ]
        );
    }

    // init page listeners
    listeners = () => {


    }
}

new Menu();