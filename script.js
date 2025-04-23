$(document).ready(function() {


    $('#print').click(function() {
      var name = $('#name').val();  
      var date = $('#date').val();
      var grandTotal = $('#totalprice').val();
    

    
      $('#modalBody').html(
        "Name: " + name + 
        "<br>\nDate: " + date +
        "<hr>Total Price: " + grandTotal

        );  
      $('#myModal').modal('show');  // Show the modal
    });

    $('#add').click( function(){


    
    

      $("#row").append( `
          
         <div class="row input-group justify-content-center">
              <div class="col-4 mt-3">
                  <div class="form-group">
              <select class="form-select" aria-label="Default select example">
              
             ${selectList()}
            </select>
                  </div>
              </div>
              <div class="col-4 mt-3">
                  <div class="form-group">
                      <input type="text" class="form-control quantity" placeholder="Quantity" />
                  </div>
              </div>
              <div class="col-4 mt-3">
                  <div class="form-group">
                      <input type="text" class="form-control price" placeholder="Amount" readonly />
                  </div>
              </div>
          </div>
      `);

      

  });


  $('#remove').click( function(){

      $("#row .input-group").last().remove();
      
  });

  $(document).on('change', '.form-select, .quantity', function() { //listening for changes in any dropdown or quantity input
    // Find the row this select or input is in
    let row = $(this).closest('.input-group');
  
    let selectedItem = row.find('.form-select').val();// getting the selected item from the .form-select value
    let quantity = row.find('.quantity').val();
    // cant use var quantity = $("#quantity").val(); since ada banyak id quantity, sebab kita add dynamically
  
    // Make sure both are valid
    if (selectedItem && !isNaN(quantity)) {
      let price = menuItems[selectedItem];
      let total = price * quantity;
  
      row.find('.price').val(`RM ${total.toFixed(2)}`);
    } else {
      row.find('.price').val('');
    }

    updateTotal();
  });

     /**
 *  Why use .find()?
 * 
 * - Since kita add rows dynamically, each row ada their own select, quantity and price inputs
 * - Kalau guna $("#quantity").val(), kita akan dapat value dari input pertama je (bukan dari row yang kita interact dengan)
 * 
 *  Why use .closest()?
 * 
 * - .closest() akan naik ke atas DOM (Document Object Model) untuk cari parent terdekat yang kita target (dalam kes ni, row atau .input-group)
 * - Lepas tu guna .find() untuk cari input dalam row tu je — supaya kita tak ambil value dari row lain
 * - penting supaya bila user tukar quantity atau pilih item, kita update harga untuk row tu sahaja
 * 
 * 
 */

});


function copy(){
    const textToCopy = $('#modalBody').text();

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert("Copied!");
      })
      .catch(err => {
        console.error("Copy failed:", err);
        alert("Failed to copy text.");
      });
}

let menuItems = {
  "cheese kut": 6.50,
  "kek batik": 6.50,
  "nasi lemak": 4.00,
  "donut": 2.00
};
  
function selectList(){
  let option = '<option selected disabled >Select An item</option>' //header
  for (let item in menuItems){
    option += `<option value = "${item}">${item}</option>`;
  }

  return option;
}

function updateTotal(){
  let grandTotal = 0;

  //iterate every price input to get grandtotal
  $('.price').each(function() {
    let priceText = $(this).val();
    if (priceText) {
      let price = parseFloat(priceText.replace('RM ', '').trim()); //only get the price and trim the RM
      grandTotal += price;
    }
  });

  $('#totalprice').val(`RM ${grandTotal.toFixed(2)}`);

}