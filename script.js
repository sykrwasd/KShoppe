$(document).ready(function() {
    $('#print').click(function() {
      var name = $('#name').val();  
      var db = $('#db').val();
      var dk = $('#dk').val();
      var date = $('#date').val();
      var time = $('#time').val();

      var totalDk = dk * 1.5;
      var totalDb = db * 2.5;

      var total = totalDk + totalDb;
    
      $('#modalBody').html(
        "Name: " + name + 
        "<br>\nDate: " + date +
        "<br>\nTime: " + time +
        "<br>\nDonut Besar: RM" + totalDb +
        "<br>\nDonut Kecil: RM" + totalDk +
        "<hr>\nTotal: RM" + total
    
    
        );  
      $('#myModal').modal('show');  // Show the modal
    });
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
  
