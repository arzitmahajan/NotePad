import React,{forwardRef}from 'react'

const Modal = (props,ref) => {
      return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3 form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" value={props.notedata.etitle} id="etitle" name="etitle" aria-describedby="emailHelp" placeholder="Enter title" onChange={props.onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" className="form-control" value={props.notedata.edescription} id="edescription" placeholder="Note description" name="edescription" onChange={props.onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="tag">Tag</label>
                                    <input type="text" className="form-control" value = {props.notedata.etag} id="etg" placeholder="Specify tag" name="edescription" onChange={props.onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref = {ref} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button disabled ={props.notedata.etitle.length<5 || props.notedata.edescription.length<5} onClick={props.handleClick} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default forwardRef(Modal);