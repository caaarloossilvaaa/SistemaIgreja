import React, { ReactNode, useContext, useEffect, useRef } from 'react'
import { CSSTransition as ReactCSSTransition } from 'react-transition-group'

interface ICSSTransition {
  className?: string
  show?: boolean
  enter?: string
  enterStart?: string
  enterEnd?: string
  leave?: string
  leaveStart?: string
  leaveEnd?: string
  appear?: any
  unmountOnExit?: any
  tag?: any
  children?: ReactNode
}

interface ITransition extends ICSSTransition {
  show?: boolean
  appear?: any
  children?: ReactNode
}

const TransitionContext = React.createContext({
  parent: {} as any,
})

function useIsInitialRender() {
  const isInitialRender = useRef(true)
  useEffect(() => {
    isInitialRender.current = false
  }, [])
  return isInitialRender.current
}

function CSSTransition({
  show,
  enter,
  enterStart,
  enterEnd,
  leave,
  leaveStart,
  leaveEnd,
  appear,
  unmountOnExit,
  tag = 'div',
  children,
  ...rest
}: ICSSTransition) {
  const enterClasses = enter!.split(' ').filter((s: string | any[]) => s.length)
  const enterStartClasses = enterStart!.split(' ').filter((s: string | any[]) => s.length)
  const enterEndClasses = enterEnd!.split(' ').filter((s: string | any[]) => s.length)
  const leaveClasses = leave!.split(' ').filter((s: string | any[]) => s.length)
  const leaveStartClasses = leaveStart!.split(' ').filter((s: string | any[]) => s.length)
  const leaveEndClasses = leaveEnd!.split(' ').filter((s: string | any[]) => s.length)
  const removeFromDom = unmountOnExit

  function addClasses(node: HTMLDivElement | null, classes: string | any[]) {
    classes.length && node!.classList.add(...classes)
  }

  function removeClasses(node: HTMLDivElement | null, classes: string | any[]) {
    classes.length && node!.classList.remove(...classes)
  }

  const nodeRef = React.useRef<HTMLDivElement>(null)
  const Component = tag

  return (
    <ReactCSSTransition
      appear={appear}
      nodeRef={nodeRef}
      unmountOnExit={removeFromDom}
      in={show}
      addEndListener={done => {
        nodeRef.current!.addEventListener('transitionend', done, false)
      }}
      onEnter={() => {
        if (!removeFromDom) nodeRef.current!.style.display = null || ''
        addClasses(nodeRef.current, [...enterClasses, ...enterStartClasses])
      }}
      onEntering={() => {
        removeClasses(nodeRef.current, enterStartClasses)
        addClasses(nodeRef.current, enterEndClasses)
      }}
      onEntered={() => {
        removeClasses(nodeRef.current, [...enterEndClasses, ...enterClasses])
      }}
      onExit={() => {
        addClasses(nodeRef.current, [...leaveClasses, ...leaveStartClasses])
      }}
      onExiting={() => {
        removeClasses(nodeRef.current, leaveStartClasses)
        addClasses(nodeRef.current, leaveEndClasses)
      }}
      onExited={() => {
        removeClasses(nodeRef.current, [...leaveEndClasses, ...leaveClasses])
        if (!removeFromDom) nodeRef.current!.style.display = 'none'
      }}
    >
      <Component ref={nodeRef} {...rest} style={{ display: !removeFromDom ? 'none' : null }}>
        {children}
      </Component>
    </ReactCSSTransition>
  )
}

export function Transition({ show, appear, ...rest }: ITransition) {
  const { parent } = useContext(TransitionContext)
  const isInitialRender = useIsInitialRender()
  const isChild = show === undefined

  if (isChild) {
    return (
      <CSSTransition
        appear={parent.appear || !parent.isInitialRender}
        show={parent.show}
        {...rest}
      />
    )
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          isInitialRender,
          appear,
        },
      }}
    >
      <CSSTransition appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  )
}
