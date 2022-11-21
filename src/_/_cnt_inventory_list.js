// html inventory list loader
export const inventoryListContent = (__) => {

    return `
    <div class="container">

        <div class="d-md-flex justify-content-between bd-highlight mb-3">
            <nav class="bc" aria-label="breadcrumb"></nav>
            <button class="btn btn-primary btn-add mt-3 mb-1 mt-md-0 mb-md-0" type="button">${ __('Add item') }</button>
        </div>

        <div class="row">
            <div class="col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">
                <div class="card border-white shadow-sm border-0">
                    <div class="card-body p-0">
                        <div class="no-footer">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="table-responsive">
                                        <table class="table table-hover table-borderless align-middle table-striped table-p-list mb-0" >
                                            <thead>

                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div class="row my-2">
                                <div class="col-sm-12 col-md-5 d-flex align-items-center">
                                    <div class="dataTables_info mx-2 text-secondary fw-lighter " id="listing_info" role="status" aria-live="polite">&nbsp;</div>
                                </div>
                                <div class="col-sm-12 col-md-7">
                                    <div class="dataTables_paginate paging_simple_numbers m-2" id="listing_paginate">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title"></h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary btn-modal"></button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>
                </div>
            </div>
        </div>
    </div>
    
    `;

}