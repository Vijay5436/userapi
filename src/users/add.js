import React , {useState} from 'react';
import Users from './userDetails'
import 'antd/dist/antd.min.css'
import './user.css';
import axios from 'axios';
import Modal from 'react-modal';
import * as Yup from 'yup';
import {Card, Avatar, Button, Input , Spin ,Space , Form} from 'antd';
import { UserOutlined, ClearOutlined, CloseOutlined ,MailOutlined} from '@ant-design/icons';
const {Meta} = Card;
const FormItem = Form.Item;
class Submit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen:false,
            first_name:'',
            email:'',
            avatar:"https://s3.amazonaws.com/uifaces/faces/twitter/hebertialmeida/128.jpg",
            updated:[],  
            spinner:false,  
        }
    }
    handleSubmit = () => {
        this.setState({spinner:true});
        let name = this.state.first_name;
        const user = {
          first_name: this.state.first_name
        };
        const em = {
            email:this.state.email
        }
        const ava = {
            avatar:this.state.avatar
        }
        // let schema = Yup.object().shape({
        //       name:Yup.string()
        //       .required('Required')  
        // })
        axios.post(`https://reqres.in/api/users`, { 
            "first_name" : user,
            "email": em,
            "avatar":ava,
         })
          .then(res => {
            var upvalue = res.data;
            var upCopy =this.state.updated;
            console.log(upvalue)
            var employeename =upvalue.first_name.first_name;
            var employeeemail =upvalue.email.email;
            var employeephoto =upvalue.avatar.avatar;
           
           
            if(employeename && employeeemail) {
                this.setState({
                    modalOpen:false,
                })
                var objdata={
                    first_name:employeename,
                    email:employeeemail,
                    avatar:employeephoto,
                }
                var joinData =upCopy.concat(objdata);
                this.setState({
                    updated:joinData
                })
            }
            this.setState({spinner:false})
            
          }).catch((error) => {
            console.log(error) 
           })
      }
    render() {
        const upd=this.state.updated;
        const {modalOpen,spinner,first_name,email} =this.state;
        //const {spinner} = this.state;
        const spinnerComponent=[];
        const nameValidate =[];
        const emailValidate= [];
        if(!first_name) {
            nameValidate.push(
                <div>Name Required</div>
            )
        }

        if(spinner === true) {
            spinnerComponent.push( <Space size="middle" key={121}>        
            <Spin size="large" />Loading...
            </Space>)
        }
        var card2 =[];
        if(upd.length >0) {
            var updatedemployee=upd;
            var employeeName;
            var employeeEmail;
            updatedemployee.map((e)=>{
                employeeName= e.first_name;
                employeeEmail=e.email;
            })
        }
            if(updatedemployee) {
                var id =10;
                updatedemployee.map((e)=> {
                    card2.push( <div id='imgdiv'>
                    <Card  key={id}
                        cover={<img alt="example" src= {e.avatar}/>}
                    >
                        <Meta title={e.first_name} description={e.email} />
                    </Card>
                </div>)
                 })
                id++;
               } else {
                   card2.push(null);
               }
        var array=[];
        array= this.props.udata;
        return(
            <div id='udiv' className='udiv'>
                <div id='udiv2' className='udiv1'>
                    <div>
                        <Button id='btn' type="primary" 
                        onClick={()=>
                        this.setState({modalOpen :true})
                        } >
                            Add
                        </Button>
                        <Modal id='modal' isOpen={modalOpen} onRequestClose={()=>this.setState({modalOpen:false})}>
                        <Avatar id='moclose' onClick={()=> this.setState({modalOpen:false})}  icon={<CloseOutlined />} />
                            <h1>User Details</h1>
                            <Input size="large"
                             validate={this.schema}
                             value={this.state.first_name} 
                             onChange={(e) => this.setState({first_name:e.target.value})}  
                             placeholder="Username" 
                             prefix={<UserOutlined />} 
                            />
                            <Input size="large" 
                             type='email' 
                             value={this.state.email} 
                             onChange={(e)=>this.setState({email:e.target.value})}  
                             placeholder="example@gmail.com" 
                             prefix={<MailOutlined />} 
                            />
                            <Button type='primary' onClick={()=>this.setState({modalOpen:false}) }>close</Button>
                            <Button type='primary' onClick={this.handleSubmit}>save</Button>
                            {/* <Form>
                                <FormItem
                                    name="note"
                                    label="Note"
                                    rules={[
                                      {
                                        required: true,
                                        message:'hello'
                                      },
                                    ]}
                                >
                                  <Input size="large" value={this.state.first_name} onChange={(e) => this.setState({first_name:e.target.value})}  placeholder="Username" prefix={<UserOutlined />} />

                                </FormItem>
                                <FormItem>
                                    <Input size="large" type='email' value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} type='email' placeholder="example@gmail.com" prefix={<MailOutlined />} />
                                </FormItem>
                            </Form> */}
                            {spinnerComponent}
                        </Modal>
                    </div>
                    <h1>Employee Details</h1>
                    <Users udata={array} />
                    {card2}
                </div>
            </div>
        )
    }
}
export default Submit;