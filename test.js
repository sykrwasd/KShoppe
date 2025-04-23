$(document).ready( function(){

    $('#add').click( function(){

       
        $("#row").append( `
            
           <div class="row input-group justify-content-center">
                <div class="col-4 mt-3">
                    <div class="form-group">
                        <input type="text" class="form-control fname" placeholder="Name" />
                    </div>
                </div>
                <div class="col-3 mt-3">
                    <div class="form-group">
                        <input type="text" class="form-control quantity" placeholder="Quantity" />
                    </div>
                </div>
                <div class="col-4 mt-3">
                    <div class="form-group">
                        <input type="text" class="form-control price" placeholder="Price" readonly />
                    </div>
                </div>
            </div>
        `);

    });

    $('#remove').click( function(){

        $("#row .input-group").last().remove();
        
    });


})