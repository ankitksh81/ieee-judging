import React from 'react'
import { Layout, Menu, Breadcrumb, Space } from 'antd';
import { Image } from 'antd';
import './header.css'

const { Header, Content, Footer } = Layout;

export default function HeaderLogos() {
    return (
        <div className="HeaderLogos">
          <img src='/logos/ieee_blue-0.jpg' alt="ieee_blue"/>
          <img src='/logos/oracle.JPG' alt="oracle"/>
          <img src='/logos/nic.jpg' alt="nic"/>
          <img src='/logos/ieee_cs.png' alt="ieee_cs"/>
        </div>
    )
}