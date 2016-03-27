
  $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
    $(".button-collapse").sideNav();
	 $(".dropdown-button").dropdown();
        

    //colapsable acodion para sidenav 
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });    
  });

  $(function() {
        $('.image-editor').cropit({
          imageState: {
            src: 'http://lorempixel.com/500/400/',
          },
        });

        $('.rotate-cw').click(function() {
          $('.image-editor').cropit('rotateCW');
        });
        $('.rotate-ccw').click(function() {
          $('.image-editor').cropit('rotateCCW');
        });

        $('.export').click(function() {
          var imageData = $('.image-editor').cropit('export');
          window.open(imageData);
        });
      });
          