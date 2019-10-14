TodoSort = {}

TodoSort.init = function(){
	this.initHandler()
}

TodoSort.initHandler = function(){
	$('.status').on('click', function(e){
		console.log($(this).attr('data-id'))
		TodoSort.updateStatus($(this).attr('data-id'))

	})
}

TodoSort.initSort = function(ele){
	$(ele).sortable({
		onDrop: function ($item, container, _super, event) {
		  $item.removeClass(container.group.options.draggedClass).removeAttr("style")
		  $("body").removeClass(container.group.options.bodyClass)
		  	TodoSort.storeOrder("#" + $($item).parent().attr("id"))
			}
	});

}


TodoSort.updateStatus = function(id){
	$.ajax({
	  method: "POST",
	  url: "tasks/update_status",
	  dataType: "json",
	  beforeSend: function(xhr) {
	    xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
	  },
	  data: {id: id}
	}).done(function(data){
		window.location.href = ''

	});

}
TodoSort.storeOrder = function(ele){
	$.ajax({
		method: "POST",
	  url: "tasks/update_sort",
	  dataType: "json",
	  beforeSend: function(xhr) {
	    xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
	  },
	  data: {elms: $(ele).sortable('serialize')[0] },
	})
}