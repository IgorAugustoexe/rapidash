import { useEffect, useRef } from 'react'

/**
 *   useEffect customizado que não pega no didmount dos componentes
 */
export const useAfterMountEffect = (func: any, deps: any) => {
    const didMount = useRef(false)
    useEffect(() => {
        if (didMount.current) func()
        else didMount.current = true
    }, deps)
}

export const removerAcento = (string: string) => {
    string = string.toLowerCase();
    string = string.replace(new RegExp('[ÁÃÀÂÄÅÆ]', 'gi'), 'a')
    string = string.replace(new RegExp('[ÉÊÈĘĖĒË]', 'gi'), 'e')
    string = string.replace(new RegExp('[ÍÎÌÏĮĪ]', 'gi'), 'i')
    string = string.replace(new RegExp('[ÓÕÔÒÖŒØŌ]', 'gi'), 'o')
    string = string.replace(new RegExp('[ÚÜÙÛŪ]', 'gi'), 'u')
    string = string.replace(new RegExp('[Ç]', 'gi'), 'c')
    string = string.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '')
    string = string.replace(/\\/g, "\\\\")
    return string
}