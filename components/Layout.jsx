import { Layout, Icon, Input, Avatar, Tooltip, Menu, Dropdown } from 'antd'
import { connect } from 'react-redux'

import getConfig from 'next/config'

const { Header, Content, Footer } = Layout
const { publicRuntimeConfig } = getConfig()

const LayoutDetail = ({ children, user }) => {
  
  const userDropDown = (
    <Menu>
      <Menu.Item>
        <a>登出</a>
      </Menu.Item>
    </Menu>
  )
  return (
    <Layout>
      <Header>
        <div className="layout-header">
          <div className="layout-header-left">
            <Icon
              type="github"
              style={{
                color: 'white',
                fontSize: 40,
                marginRight: 20
              }}
            />
            <Input.Search placeholder="去搜索"/>
          </div>
          <div className="layout-header-right">
            {
              user && user.avatar_url ? (
                <Dropdown overlay={ userDropDown }>
                  <a href="#">
                    <Avatar size={ 40 } src={ user.avatar_url }/>
                  </a>
                </Dropdown>  
              ) : (
                <Tooltip title="点击进行登录">
                  <a href={ publicRuntimeConfig.OAUTH_URL }>
                    <Avatar size={ 40 } icon="user"/>
                  </a>
                </Tooltip> 
              )
            }
          </div>
        </div>
      </Header>

      <Content>
        <section className="container">
          { children }
        </section>
      </Content>
      
      <Footer>
        <div style={{textAlign: 'center'}}>by MuYunChunShu @<a>1772853215@qq.com</a> </div>
      </Footer>
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .layout-header, .layout-header-left {
          display: flex;
          justify-content: space-between;
          align-items: center
        }
        `}</style>
      <style jsx global>{`
        #__next, .ant-layout {
          height: 100%;
        }
      `}</style>  
    </Layout>
  )
}

export default connect(
  (state) => ({ user: state.user })
)(LayoutDetail)