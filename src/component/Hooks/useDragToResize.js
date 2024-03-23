import { useEffect, useState } from "react";

export const useDragToResize = (refs, callback, direction = 'x-axis') => {
  const [isResizing, setIsResizing] = useState(-1);

  const setCursorDocument = (isResizing) => {
    document.body.style.cursor = isResizing ? "col-resize" : "auto";
  };

  const onClickResize = (index) => {
    setIsResizing(index);
    setCursorDocument(true);
  };

  useEffect(() => {
    const adjustSize = (index, val) => {
      const min = direction === "x-axis" ? refs[index]?.minWidth : refs[index]?.minHeight;
      const max = direction === "x-axis" ? refs[index]?.maxWidth : refs[index]?.maxHeight;
      const newD = val > max ? max : val < min ? min : val;
      if (direction === "x-axis") {
        refs[index].current.parentElement.style.width = newD + "px";
      } else {
        refs[index].current.parentElement.style.height = newD + "px";
      }
      callback && callback(refs[index]);
    };

    const handleOnMouseMove = (e) => {
      if (isResizing >= 0 && refs.length !== 0) {
        let allDimention;
        if (direction === "x-axis") {
          allDimention = e.clientX - refs[isResizing].current.parentElement?.getBoundingClientRect().left;
        } else {
          allDimention = e.clientY - refs[isResizing].current.parentElement?.getBoundingClientRect().top;
        }
        adjustSize(isResizing, allDimention);
      }
    };

    const handleOnMouseUp = () => {
      setIsResizing(-1);
      setCursorDocument(false);
    };

    document.addEventListener("mousemove", handleOnMouseMove);
    document.addEventListener("mouseup", handleOnMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleOnMouseMove);
      document.removeEventListener("mouseup", handleOnMouseUp);
    };
  }, [refs, callback, direction, isResizing]);

  return onClickResize;
};
