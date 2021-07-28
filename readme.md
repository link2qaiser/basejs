# Base JS - Introduction
`base.js` is open source frame work for web developer. It has following features.

## Prerequisite 
Markup : 
* Jquery
* Bootstrap

---
**NOTE**
For backend example we will use the Laravel code.
---

## Load Modal
Most of time you need to load modal dynamicall so you can add follwing code to make ajax call to load dynamic modal

```
<a href="#data_modal" data-toggle="modal" onclick="loadModal('user/create')">Add User</a>
```

Modal Laravel view

```
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add User</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">
            ×
        </span>
        </button>
    </div>
    <form action="example.com/user/create" method="post" >
        <div class="modal-body">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label for="Name" class="control-label">Name</label>
                        <input type='text' name="Name" class="form-control"  />
                    </div>
                </div> 
            </div>
        </div>
        <div class="modal-footer">
            <button type="submit" class="btn btn-info m-btn m-btn--icon" ><span><i class="la la-plus"></i><span>Add</span></span></button>
            <button type="button" class="btn btn-secondary m-btn m-btn--icon" data-dismiss="modal"><span>Close</span></button>
        </div>
    </form>
</div> 
```


