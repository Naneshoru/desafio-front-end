/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"

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
    elem.style.right = "30px"
    elem.style.top = "0"
  }

  const elem2 = document.getElementsByClassName("debug")?.[0] as any
  if (elem2) {
    elem2.style.top = "200px"
    elem2.style.left = "30px"
    elem2.style.backgroundColor = "cyan"
  }

  return (
    <div
      className="debug custom-scroll"
      style={{
        overflow: "auto",
        position: "fixed",
        top: "100px",
        maxHeight: "80vh",
        background: "white",
        zIndex: 130,
        opacity,
        color: "red",
      }}
    >
      <pre>
        {JSON.stringify(valueLocal, null, 2)}
        <br></br>
        {children}
      </pre>
    </div>
  )
}

export default Debug
