import React,{useState, useEffect} from 'react'
import { Button, Modal } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {deleteServiceCategory, deleteServiceSubCategory, deleteService} from '../redux/actions/serviceAction'
import {deleteVoucher} from '../redux/actions/voucher'
import {deleteCity} from '../redux/actions/cityAction'
import {deleteServiceProvider} from '../redux/actions/serviceProvider'
import Loader from './Loader'

const DeleteModal = ({data, deleteModal, setDeleteModal}) => {
    const {loader} = useSelector(store=>store.serviceRoot)
    const [metaData, setMetaData] = useState(null)

    useEffect(() => {
        if(data.metaData && Object.keys(data.metaData).length > 0){
            setMetaData(data.metaData)
        }
        return ()=>{
            setMetaData(null)
        }
    }, [])


    const dispatch = useDispatch()
    const clickHandler = ()=>{
        if(data.actionType === "delete_service_category"){
          dispatch(deleteServiceCategory(data._id,()=>setDeleteModal(false)))
          return
        }
        if(data.actionType === "delete_service_sub_category"){
            dispatch(deleteServiceSubCategory(data._id,()=>setDeleteModal(false)))
            return
        }
        if(data.actionType === "delete_service"){
            dispatch(deleteService(data._id,()=>setDeleteModal(false)))
            return
        }
        if(data.actionType === "delete_voucher"){
            dispatch(deleteVoucher(data._id,()=>setDeleteModal(false)))
            return
        }
        if(data.actionType === "delete_city"){
            dispatch(deleteCity(data._id,()=>setDeleteModal(false)))
            return
        }
        if(data.actionType === "delete_service_provider"){
            dispatch(deleteServiceProvider(data._id,()=>setDeleteModal(false)))
            return
        }
    }
    return (
        <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title className="text-danger">{data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {metaData && metaData.isActive && <h4 className="text-danger">IT IS STILL ACTIVE, FIRST DEACTIVATE IT.</h4>}
           <h5>Are you sure want to Delete ?</h5>
        </Modal.Body>
        <Modal.Footer>
            { !metaData && <div>{loader ? <Loader/> : <Button variant="primary" onClick={clickHandler}>
                Yes
            </Button>}</div> }
            
             {metaData && !metaData.isActive && <div>
            {loader ? <Loader/> : <Button variant="primary" onClick={clickHandler}>
                Yes
            </Button>}
            </div>}
            <Button variant="secondary" onClick={()=>setDeleteModal(false)}>
                No
            </Button>
        </Modal.Footer>
    </Modal>
    )
}

export default DeleteModal
