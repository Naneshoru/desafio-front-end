/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react"

type Props = {
  value: any
  opacity?: number
  children?: any
}
function Debug({ value, opacity, children }: Props): any {
  const [valueLocal, setValueLocal] = useState<any>()
  useEffect(() => {
    setValueLocal(value)
  }, [value])

  const elem = document.getElementsByClassName("debug")?.[1] as any
  if (elem) {
    elem.style.right = ""
    elem.style.left = "30px"
  }

  const elem2 = document.getElementsByClassName("debug")?.[2] as any
  if (elem2) {
    elem2.style.top = "50%"
    elem2.style.left = "30px"
    elem2.style.width = "200px"
  }

  const [render, setRender] = useState<any>(false)

  return (
    <div
      className="debug custom-scroll"
      style={{
        overflow: "auto",
        position: "fixed",
        right: "30px",
        top: "100px",
        maxHeight: "80vh",
        background: "white",
        zIndex: 130,
        opacity,
        color: "red",
        width: "350px",
      }}
    >
      {/* <button onClick={(() => { setRender((prev: boolean) => !prev) })}>Update</button> */}
      {/* &nbsp; {JSON.stringify(render, null, 2)} */}
      <pre>
        {JSON.stringify(valueLocal, null, 2)}
        <br></br>
        {children}
      </pre>
    </div>
  )
}

export default Debug
