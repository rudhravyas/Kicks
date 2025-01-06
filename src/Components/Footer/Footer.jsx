import React from 'react'
import github from "../../Assets/github.svg";
import Linkedin from "../../Assets/linkedin.svg";
import insta from "../../Assets/instagram.svg"


function Footer() {
  return (
    <div>
    <div className="footer mt-10 ">
        <div className="flex justify-center">
           <a href="https://github.com/rudhravyas" target="blank"><img src={github} alt="" className="h-8 mx-5 hover:cursor-pointer"/></a> 
            <a href="https://www.linkedin.com/in/rudhra-vyas/" target="blank"><img src={Linkedin} alt="" className="h-10 mx-5 hover:cursor-pointer"/></a>
           <a href="https://www.instagram.com/rudhra_vyas/?igsh=MWl4YnV2a3ZrZXJ2Mg%3D%3D" target="blank"> <img src={insta} alt="" className="h-8 mx-5 hover:cursor-pointer"/></a>
        </div>
        <p className="text-center my-2">© 2024 Your Company, Inc. All rights reserved.</p>
        <p className="text-center my-2">Made By - Rudhra Vyas</p>
      </div>
      </div>
  )
}

export default Footer