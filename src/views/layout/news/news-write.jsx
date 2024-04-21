import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'    //表格、删除线、任务列表、引用等操作
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'  //代码高亮
import { dark, a11yDark, atomDark, base16AteliersulphurpoolLight, cb, coldarkCold, coldarkDark, coy, coyWithoutShadows, darcula, dracula, duotoneDark, duotoneEarth, duotoneForest, duotoneLight, duotoneSea, duotoneSpace, funky, ghcolors, gruvboxDark, gruvboxLight, holiTheme, hopscotch, lucario, materialDark, materialLight, materialOceanic, nightOwl, nord, okaidia, oneDark, oneLight, pojoaque, prism, shadesOfPurple, solarizedDarkAtom, solarizedlight, synthwave84, tomorrow, twilight, vs, vscDarkPlus, xonokai, zTouch } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkMath from 'remark-math'   //数学公式
import rehypeKatex from 'rehype-katex' //数学公式

import remarkToc from 'remark-toc' //自动生成目录

import helpList from './staticData/helpList'
import PublishModal from './Publish-modal'
import isEmpty from '../../../publicFunction/isEmpty'
import { message } from 'antd'

import { addNews } from '../../../http/api'
import './news-write.scss'


export default function writenews() {



  const [title, setTitle] = useState('')
  const [markdown, setMarkdown] = useState(`
~~~js
hello world
~~~
  `)


  const [helpModal, setHelpModal] = useState(false)
  const [publishModal, setpublishModal] = useState(false)


  const editMarkDown = (e) => {
    // console.log(e.target.value);
    setMarkdown(e.target.value)
  }

  const changePublishModal = () => {
    if (isEmpty(title)) {
      message.error("报告标题不能为空!")
      return
    }
    if (isEmpty(markdown)) {
      message.error("报告内容不能为空!")
      return
    }

    setpublishModal(!publishModal)
    // let data = {
    //   title: title,
    //   markdown: markdown
    // }
  }

  const publish = async (info) => {
    let data = {
      Title: title,
      Container: markdown,
      Auth: '',
      Status: 0,
      ...info
    }
console.log(data);
    let res = await addNews(data)
    changePublishModal(!publishModal)
    console.log(res);
  }

  return (
    <div className='writenews'>

      <div className='header' >
        <div className='header_title' >
          <input placeholder='请输入标题' onChange={e => setTitle(e.target.value)} className='header_title_titleInput' type="text" />
          <div className='header_title_publishBtn' onClick={changePublishModal} >提交</div>
        </div>
        <div className='tool_list' >
          <div className='tool_item' onClick={() => setHelpModal(!helpModal)} >帮助</div>
        </div>
      </div>

      <div className='container' >
        <div className='container_edit' >
          <textarea
            className='container_edit_textarea'
            value={markdown}
            onChange={editMarkDown} ></textarea>
        </div>
        <div className='container_show' >
          <ReactMarkdown
            children={markdown}
            remarkPlugins={[remarkGfm, remarkMath, remarkToc]}
            rehypePlugins={[rehypeKatex]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          />
        </div>

        {
          helpModal ?
            <div className='help'  >
              <div className='help_option' >
                <span>帮助</span>
                <span onClick={() => setHelpModal(!helpModal)} >×</span>
              </div>
              {
                helpList.map((item, index) => {
                  return (
                    <div key={index} className='help_item' >
                      <div className='help_item_key' >
                        {item.key}
                      </div>
                      <div className='help_item_value' >
                        {item.value}
                      </div>
                    </div>
                  )
                })
              }
            </div>
            :
            ''
        }

      </div>

      <PublishModal
        show={publishModal}
        change={changePublishModal}
        data={{ title: title, container: markdown }}
        publish={publish}
      />


    </div>

  )
}
