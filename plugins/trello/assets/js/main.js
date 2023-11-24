function loadComments(url) {
    $.ajax({
      type: "get",
      cache: false,
      url: url,
      dataType: "json",
      headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") },
      success: function (res) {
        console.log(res);
      },
    });
}
$(function() {
    $('ul[id^="sort"]').sortable({
        connectWith: ".sortable",
        receive: function(e, ui) {
            var that = $(this);
            console.log(that.closest("form").attr("action"));
            var status = $(ui.item).closest(".status-card").attr("id");
            var tas_id = $(ui.item).data("task-id");
            $.ajax({
              type: "POST",
              cache: false,
              url: that.closest("form").attr("action"),
              dataType: "json",
              data: {"tas_id":tas_id,"status":status},
              headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") },
              success: function (res) {
                
                
              },
            });
        }

    }).disableSelection();
});

$(document).ready(function() {
    
    $(document).on("click", ".text-row", function(event) {
        console.log("test");
    });
    $(document).on("click", ".add-card-btn", function(event) {
        let new_card = $("#new-card").html();
        var that = $(this);
        that.closest(".status-card").find(".actions").prepend(new_card);
        that.hide();
    });
    $(document).on("click", ".saved", function(event) {
        var label = $(this).closest(".new-task").find("textarea").val().trim();
        var status = $(this).closest(".status-card").attr("id");
        if(label == "") {
            $(this).closest(".new-task").find("textarea").focus();
            return false;
        }
        var that = $(this);
        $.ajax({
          type: that.closest("form").attr("method"),
          cache: false,
          url: that.closest("form").attr("action"),
          dataType: "json",
          data: {"label":label,"status":status},
          headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") },
          success: function (res) {
            that.closest(".status-card").find("ul").append(res.data.li);
            that.closest(".actions").find(".add-card-btn").show();
            that.closest(".new-task").hide();
          },
        });
        
    });
    $(document).on("submit", "#commentForm", function(event) {
        var comments = $(this).find("textarea").val();
        if( comments.trim() == "")
            return false;
        that  = $(this);
        $.ajax({
          type: that.attr("method"),
          cache: false,
          url: that.attr("action"),
          dataType: "json",
          data: {"comments":comments},
          headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") },
          success: function (res) {
          },
        });
        return false;
    });
    $(document).on("click", ".closed", function(event) {
        $(this).closest(".actions").find(".add-card-btn").show();
        $(this).closest(".new-task").hide();
    });

});

$(document).ready(function() {
    $(".cli").click(function() {
        $(".para").toggle();
    });
});

$(document).ready(function() {
    $(".clic").click(function() {
        $(".parag").toggle();
    });
});

$(document).ready(function() {
    $(".clicko").click(function() {
        $(".paragr").toggle();
    });
});

$(document).ready(function() {
    $(".clickok").click(function() {
        $(".paragro").toggle();
    });
});

$(document).ready(function() {
    $(".clickk").click(function() {
        $(".paragra").toggle();
    });
});

$(document).ready(function() {
    $(".clickkk").click(function() {
        $(".paragrag").toggle();
    });
});

$(document).ready(function() {
    $(".clickkki").click(function() {
        $(".paragragh").toggle();
    });
});
$(document).on("click", ".tablet", function() {
    var text = $(this).text();
    console.log(text);
    if (text.toLowerCase() == "all") {
        $("#all").show();
        $("#comments").hide();
        $("#history").hide();
        $("#zendesk").hide();
        $("#salesforce").hide();
        $("#work").hide();
    } else if (text.toLowerCase() == "comments") {
        $("#all").hide();
        $("#comments").show();
        $("#history").hide();
        $("#zendesk").hide();
        $("#salesforce").hide();
        $("#work").hide();
    } else if (text.toLowerCase() == "history") {
        $("#all").hide();
        $("#comments").hide();
        $("#history").show();
        $("#zendesk").hide();
        $("#salesforce").hide();
        $("#work").hide();
    } else if (text.toLowerCase() == "zendesk support") {
        $("#all").hide();
        $("#comments").hide();
        $("#history").hide();
        $("#zendesk").show();
        $("#salesforce").hide();
        $("#work").hide();
    } else if (text.toLowerCase() == "salesforce comments") {
        $("#all").hide();
        $("#comments").hide();
        $("#history").hide();
        $("#zendesk").hide();
        $("#salesforce").show();
        $("#work").hide();
    } else if (text.toLowerCase() == "work log") {
        $("#all").hide();
        $("#comments").hide();
        $("#history").hide();
        $("#zendesk").hide();
        $("#salesforce").hide();
        $("#work").show();
    }
})
$("#message").keypress(function(e) {
    if (e.keyCode == 13) {
        var text = $(this).val();
        var data = `<div class="row mt-2">
             <div class="col-md-12">
             <div class="custom mr-2">ZA</div>
             <div><small class="mr-1"><b>zain_dixeam26</b></small><small>` + text + `</small><br><div class="fn-12">Jan 22 at 9:11 pm</div></div>
             </div>
             </div>`;
        $("#thisis").append(data);
        $("input[type=text], textarea").val("");

    }
})
$(document).ready(function() {
    $(".appe").click(function() {
        // alert("hello");
        $(".appe").append(`<button type="button" class="btn btn-info mt-1 form-control">Submitt</button>`);
    });
});