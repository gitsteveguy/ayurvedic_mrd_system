import React from 'react'

import { useEffect } from 'react';
import './Forms.css'

export default function FormContainer(props) {
  useEffect((e) => {
    let inputs = document.querySelectorAll('.animated_inputs');
    inputs.forEach((input)=>{
      input.addEventListener('focusin',(e)=>{
        e.target.nextElementSibling.classList.add('input_has_value')
      })
      input.addEventListener('focusout',(e)=>{
        if(e.target.value==='')
        {
          e.target.nextElementSibling.classList.remove('input_has_value')
        }
      })
    })

    // Handling Pwd Fields
    let password_fields = document.querySelectorAll('input[type=password]');
    password_fields.forEach((password_field)=>{
      let parent = password_field.parentElement;
      let label = password_field.nextElementSibling;
      password_field.remove();

      // Create the outermost container for the password input 
      const passwordInputContainer = document.createElement('div');
      passwordInputContainer.classList.add('password_input');

      // Create the container for the password field
      const passwordFieldContainer = document.createElement('div');
      passwordFieldContainer.classList.add('password_field');

      passwordFieldContainer.appendChild(password_field);
      passwordFieldContainer.appendChild(label);

      //    // iconSpan.appendChild(visibilityIcon);Append the password field container to the password input container
      passwordInputContainer.appendChild(passwordFieldContainer);

      // Create the container for the password visibility icon
      const iconContainer = document.createElement('div');
      iconContainer.classList.add('password_icon_container');

      let icon = document.createElement('span')
      icon.setAttribute('class', 'material-symbols-rounded password_toggle');
      icon.innerText = 'visibility'

      // Create the span element for the tooltip and icon
      const iconSpan = document.createElement('span');
      iconSpan.appendChild(icon);
      iconSpan.setAttribute('class', 'password_toggle_span');
      iconSpan.setAttribute('tooltip', 'Show Password');
  

      // Append the icon span to the icon container
      iconContainer.appendChild(iconSpan);

      // Append the icon container to the password input container
      passwordInputContainer.appendChild(iconContainer);



      // Append the password input container to the document body or another desired parent element
      parent.appendChild(passwordInputContainer);


      let pwd_visibility_toggles = document.querySelectorAll('.password_toggle');
      pwd_visibility_toggles.forEach((pwd_visibility_toggle) =>{
        pwd_visibility_toggle.addEventListener('click',(e)=>{
          let input = pwd_visibility_toggle.parentElement.parentElement.previousElementSibling.children[0];
          input.type = (input.type==='password')? 'text' : 'password';
          pwd_visibility_toggle.innerText = (pwd_visibility_toggle.innerText==='visibility')? 'visibility_off' : 'visibility';
         let tooltip = pwd_visibility_toggle.parentElement.attributes['tooltip'];
          tooltip.value = (tooltip.value==='Show Password')? 'Hide Password' : 'Show Password';
          
        })
      })

      


   
    })
 


  }
);
  return (
    <div className="form-container">
    {props.form}
    </div>
  )
}
