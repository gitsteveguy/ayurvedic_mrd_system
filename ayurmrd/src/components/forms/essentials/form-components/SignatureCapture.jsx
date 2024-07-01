import React,{useRef,useState,useEffect} from 'react'
import ICol from './ICol'

export default function SignatureCapture(props) {
    const blank = '/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAEsASwDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAj/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//Z'
    const canvasReference = useRef(null);
  const contextReference = useRef(null);
  const signuriReference = useRef(null)
  let initialstate = props.value===''? blank : props.value;
  const[signurifdvalue,setsignurifdvalue] = useState(initialstate)
  const [isPressed, setIsPressed] = useState(false);
  const [saved, setSaved] = useState(false);
  

  const clearCanvas = () => {
    const canvas = canvasReference.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    const signuri = signuriReference.current;
    signuri.value = '';
    setSaved(false)
  };

  const beginDraw = (e) => {
    contextReference.current.beginPath();
    contextReference.current.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    setSaved(false)
    setIsPressed(true);
  };

  const updateDraw = (e) => {
    if (!isPressed) return;

    contextReference.current.lineTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    contextReference.current.stroke();
  };

  const endDraw = () => {
    confirmSignature()
    contextReference.current.closePath();
    setIsPressed(false);
  };

  const confirmSignature = () =>{
   
    const canvas = canvasReference.current;
    var du = canvas.toDataURL('image/png', 0.8);
    var b64du = du.replace(/^data:image\/?[A-z]*;base64,/, "");
    if(blank!==b64du){
    setsignurifdvalue(b64du);
    let event = {target:{name: props.name,value: b64du}}
    setSaved(true)
    props.onChange(event)
  }
  }

  useEffect(() => {
    const body = document.querySelector('body');
    //body.addEventListener('mouseup',endDraw)
    const canvas = canvasReference.current;
    canvas.width = 300;
    canvas.height = 300;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = '#050363';
    context.lineWidth = 5;
    contextReference.current = context;
    // eslint-disable-next-line
},[])




    return (
        <ICol down gap='0.5rem'>
                <h3>{props.label}</h3>
                {/* Base 64 Input */}
                <input ref={signuriReference} name={props.name} required={props.required} type="hidden" style={{opacity:0,width:0,position:'absolute'}}  onInvalid={(e)=>{e.target.setCustomValidity('Please Sign')}} value={signurifdvalue} />
                <canvas width="300" height="300"
                ref={canvasReference}
                onMouseDown={beginDraw}
                onMouseMove={updateDraw}
                onMouseUp={endDraw}
                className={saved ? 'signature-canvas confirmed' : 'signature-canvas'} />
                <div className="signature-input-btngroup">
                <button type="button" className="primary-btn" onClick={clearCanvas}>Clear</button>
                </div>
        </ICol>
    )
}
