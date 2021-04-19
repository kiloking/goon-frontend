import React,{useState}  from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useForm  } from "react-hook-form";
function CreatePost(props) {
    const [isOpen, setIsOpen] = useState(false); 
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data,e) =>{
      props.fetchPostData(data);
      e.target.reset();
      setIsOpen(!isOpen)
    } 

    function handler(){
      setIsOpen(!isOpen)
    }
    


    return (
        <div className="createPost">
          <div className = { isOpen ? "mainform active" : "mainform"} >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input_wrap">
                <input type="text" id="name" {...register('name', { required: true, maxLength: 16 })} />
                {errors.name && errors.name.type === "required" && <span>這項目必須填寫</span>}
                {errors.name && errors.name.type === "maxLength" && <span>字數過多</span> }
                <label >提案人</label>
              </div>
              <div className="input_wrap">
                <select {...register("category")}>
                  <option value="遊戲or聚會">遊戲 or 聚會</option>
                  <option value="內部直播">內部直播</option>
                  <option value="講座">講座</option>
                </select>
                <label >主題類別</label>
              </div>
              
              <div className="input_wrap">
                <input type="text" id="subject" {...register('subject', { required: true })} />
                {errors.subject && errors.subject.type === "required" && <span>這項目必須填寫</span>}
                {errors.subject && errors.subject.type === "maxLength" && <span>字數過多</span> }
                <label >題目</label>
              </div>
              <div className="input_wrap">
                <input type="text"  id="host" {...register('host', { required: true })} />
                {errors.host && errors.host.type === "required" && <span>這項目必須填寫</span>}
                {errors.host && errors.host.type === "maxLength" && <span>字數過多</span> }
                <label>主講人 / 主持人</label>
              </div>
              <div className="input_wrap">
                <input type="text" id="partner" {...register('partner', { required: true })} />
                {errors.partner && errors.partner.type === "required" && <span>這項目必須填寫</span>}
                {errors.partner && errors.partner.type === "maxLength" && <span>字數過多</span> }
                <label >副手 / 與會者</label>
              </div>
              
              <input type="submit" value="送出提案" />
            </form>
          </div> 

          
          <div className="openform" onClick={handler}>
            <FontAwesomeIcon icon={faPlus}  />
          </div>
                
        </div>
    )
}

export default CreatePost
