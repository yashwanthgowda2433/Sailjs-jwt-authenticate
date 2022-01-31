$(document).ready(function() {
	// When the "submit" button is clicked on the add page, attempt to sign up
	$(document).on('click', '#table_submit', function onSubmitadd(e) {
		$('#errors').html('')
		e.preventDefault()
		$.ajax('/user/add', {
			method: 'post',
			contentType: 'application/json',
			processData: false,
			data: JSON.stringify({
				name: $('input[name=name]').val(),
				email: $('input[name=email]').val(),
				number: $('input[name=number]').val(),
				password: $('input[name=password]').val()
			}),
			// If the signup is successful, save the JWT token and load the welcome page
			success: function(data) {
				// $('.container-store').html(data);

				document.open();
				document.write(data);
				document.close();
		        $('#adddisplay').css('display','block');

				// window.location = '/welcome'
			},
			// If not, update the "errors" section on the page
			error: function(jqXHR, text) {
				$('#errors').html(jqXHR.responseText)
			}
		})
	});

	// When the "submit" button is clicked on the delete page, attempt to sign up
	$(document).on('click', '.delete_but', function ondelete(e) {
		$('#errors').html('')
		e.preventDefault()
		$.ajax('/user/delete', {
			method: 'post',
			contentType: 'application/json',
			processData: false,
			data: JSON.stringify({
				iddel: $(this).attr('data-id')
			}),
			// If the signup is successful, save the JWT token and load the welcome page
			success: function(data) {
				// $('.container-store').html(data);
				document.open();
				document.write(data);
				document.close();

				// window.location = '/welcome'
			},
			// If not, update the "errors" section on the page
			error: function(jqXHR, text) {
				$('#errors').html(jqXHR.responseText)
			}
		})
	});

	$('#add-display').click(function(){
		$('#adddisplay').css('display','block');
		$('#tabledisplay').css('display','none');

	});

	$('#cancelback').click(function(){
		$('#adddisplay').css('display','none');
		$('#tabledisplay').css('display','block');

	});

	$('.edit_but').click(function(){
		var id = $(this).attr('data-id');
		var name = $('#name_'+id).attr('data');
		var email = $('#email_'+id).attr('data');
		var number = $('#number_'+id).attr('data');

        $('#name_'+id).html('<input type="text" name="name" class="input_name_update" data-id="'+id+'" value="'+name+'" data/>');
		$('#email_'+id).html('<input type="text" name="email" class="input_email_update" data-id="'+id+'" value="'+email+'"/>');
		$('#number_'+id).html('<input type="text" name="number" class="input_number_update" data-id="'+id+'" value="'+number+'"/>');

		// alert(description);
	});

	// $('.input_title_update').focusout(function(){
	$(document).on("focusout",".input_name_update",function(){
		var id = $(this).attr('data-id');
		var input = $(this).val();
		$.ajax('/user/edit', {
			method: 'post',
			contentType: 'application/json',
			processData: false,
			data: JSON.stringify({
				id: id,
				name: input
			}),
			// If the signup is successful, save the JWT token and load the welcome page
			success: function(data) {
				// $('.container-store').html(data);
				// document.open();
				// document.write(data);
				// document.close();

				// window.location = '/welcome'
			},
			// If not, update the "errors" section on the page
			error: function(jqXHR, text) {
				$('#errors').html(jqXHR.responseText)
			}
		})

	});

	// $('.input_description_update').focusout(function(){
	$(document).on("focusout",".input_email_update",function(){
		var id = $(this).attr('data-id');
		var input = $(this).val();
		$.ajax('/user/edit', {
			method: 'post',
			contentType: 'application/json',
			processData: false,
			data: JSON.stringify({
				id: id,
				email: input
			}),
			// If the signup is successful, save the JWT token and load the welcome page
			success: function(data) {
				// $('.container-store').html(data);
				// document.open();
				// document.write(data);
				// document.close();

				// window.location = '/welcome'
			},
			// If not, update the "errors" section on the page
			error: function(jqXHR, text) {
				$('#errors').html(jqXHR.responseText)
			}
		})

	});

	$(document).on("focusout",".input_number_update",function(){
		var id = $(this).attr('data-id');
		var input = $(this).val();
		$.ajax('/user/edit', {
			method: 'post',
			contentType: 'application/json',
			processData: false,
			data: JSON.stringify({
				id: id,
				number: input
			}),
			// If the signup is successful, save the JWT token and load the welcome page
			success: function(data) {
				// $('.container-store').html(data);
				// document.open();
				// document.write(data);
				// document.close();

				// window.location = '/welcome'
			},
			// If not, update the "errors" section on the page
			error: function(jqXHR, text) {
				$('#errors').html(jqXHR.responseText)
			}
		})

	});
          
	
	


(function() {
    $('#file-s').change(function(){
		
    var size = document.getElementById("file-s").files[0].size;
    //  alert(size);
     if(size > 0)
     {
      $('#new_ac').ajaxForm({
        beforeSend: function() {
          
        },
        uploadProgress: function(event, position, total, percentComplete) {
            
        },
        success: function() {
         
        },
      complete: function(data) {
		  console.log(data.responseText)
		document.open();
		document.write(data.responseText);
		document.close();
      }
    }); 
	$('#new_ac').submit();

     }else{
    
     }
	});
    
    })();       


});
