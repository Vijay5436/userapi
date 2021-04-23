import React from 'react';
import './user.css';

import {Card, Avatar, Button, Input , Spin ,Space} from 'antd';
import Submit from './add';

import 'antd/dist/antd.min.css';
import { UserOutlined, ClearOutlined, CloseOutlined , MailOutlined} from '@ant-design/icons';

const {Meta} = Card;

class Users extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        var array=[];
        array= this.props.udata;
        console.log(this.props.udata)
        var card='';
        if(array.length === 0) {
            card = <Space size="middle" key={121}>        
            <Spin size="large" />working on request please wait
            </Space>
        } else {
            for(let i=0;i<array.length;i++) {
                card = array.map((e)=>
                    <div id='imgdiv'>
                    <Card
                        cover={<img key={i} alt="example" src={e.avatar} />}
                    >
                        <Meta key={i} title={e.first_name} description={e.email} />
                    </Card>
                </div>
               )
             }
        }
    
            return(
                <div>
                    {card} 
                </div>
            )
    }
}
export default Users;