import React from 'react'
import { Image } from 'expo-image'

import { extractPadding } from './Margins'
import { ComponentStyle, IconSizeMap, IconType, SpaceStyle } from '../components/types'
import { Col } from '../StyleToProps'

interface TTImageProps {
  src: IconType.IconSource
  resize?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  shape?: IconType.Shape
  state?: ComponentStyle.State
  size?: ComponentStyle.SizeWithObject | IconType.Style
  padding?: SpaceStyle.Margin

  onLoadError?: () => void
}

// const THUMBNAIL_WIDTH = 600 as const
// const THUMBNAIL_HEIGHT = 600 as const

/**
 * @interface TTImageProps
 * @name src required. image resource value
 * @name resize optional. It is not used when mimetype is svg, but only for png and url mimetype.
 * @name shape optional. square, circle
 * @name state optional. normal, selected. disabled, progress,
 * @name size optional. small, medium, large, xlarge
 * @name padding optional. { left, top, right, bottom }
 */
export const TTImage: React.FC<TTImageProps> = ({ src, resize, state = 'normal', size = 'medium', padding, onLoadError, shape }) => {
  /************
   * function
   ************/

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  const getIconSize = () => {
    try {
      if (size && typeof size === 'string') {
        const v = IconSizeMap[size]
        return { width: v, height: v }
      }

      if (size && typeof size === 'object') {
        return size
      }
    } catch (e) {
      console.error('[TTImage] Invalid Size.')
    }

    return { width: 0, height: 0 }
  }

  const getSource = () => {
    if (typeof src === 'object' && src?.enabled) {
      const source = src as IconType.ImageSourceOfState

      if (state === 'disabled' && source.disabled) return source.disabled
      if (state === 'selected' && source.selected) return source.selected
      if (state === 'progress' && source.pressed) return source.pressed

      return source.enabled
    }

    return src as IconType.ImageSource
  }

  /*********
   * render
   *********/

  const renderSvgImage = () => {
    const { width, height } = getIconSize()
    const source = getSource()
    // @ts-ignore
    return <source.default width={width} height={height} />
  }

  const renderRemoteImage = () => {
    const { width, height } = getIconSize()
    const source = getSource()

    if (isNaN(source as any)) {
      return renderUriImage({ width, height, uri: source as string })
    }

    return <Image style={{ width, height }} source={Number(source)} contentFit={resize} onError={onLoadError} />
  }

  const renderUriImage = ({ aspectRatio, width, height, uri }: IconType.Style & { uri: string }) => {
    if (uri.includes('file://') || uri.includes('content://') || uri.includes('data:image/')) {
      return <Image style={{ width, height }} source={{ uri }} contentFit={resize} onError={onLoadError} />
    }

    // render S3 remote image
    // const ratio = aspectRatio ? aspectRatio : 1
    // let _width: number
    // let _height: number
    // if (typeof width === 'number' && typeof height === 'number' && width < 200 && height < 200) {
    //   _width = Math.floor(width * 3)
    //   _height = Math.floor(height * 3)
    // } else {
    //   _width = ratio > 1 ? Math.floor(THUMBNAIL_WIDTH * ratio) : THUMBNAIL_WIDTH
    //   _height = ratio < 1 ? Math.floor(THUMBNAIL_HEIGHT * ratio) : THUMBNAIL_HEIGHT
    // }
    // const hasHost = uri.includes('http://') || uri.includes('https://')
    // const encodedUri = encodeUrl(uri)
    // const remoteUrl = hasHost ? encodedUri : `${Config.CDN_URL}/${encodedUri}`

    // return (
    //   <Image
    //     placeholder={blurhash}
    //     source={{ uri: `${remoteUrl}?d=${_width}x${_height}` }}
    //     style={{ width, height, aspectRatio }}
    //     contentFit={resize}
    //   />
    // )
  }

  // Object.
  let element: JSX.Element = null

  let typeCheck = []
  if (typeof src === 'object' && !!src.enabled) {
    typeCheck = Object.getOwnPropertyNames(src.enabled)
  } else {
    typeCheck = Object.getOwnPropertyNames(src)
  }

  if (!!typeCheck?.length && typeCheck?.includes('default')) {
    element = renderSvgImage()
  } else {
    element = renderRemoteImage()
  }

  if (!element) throw new Error('failed make image element')
  if (padding) {
    return (
      <Col style={[extractPadding(padding)]}>{element}</Col>
    )
  } else {
    return (
      { element }
    )
  }
}

// const encodeUrl = (target: string) => {
//   const regex = /[^A-Za-z0-9\-_.~!*'();:@&=+$,/?#[\]]/g
//   const hasSpecialChars = regex.test(target)

//   if (hasSpecialChars) {
//     return encodeURIComponent(target)
//   } else {
//     return target
//   }
// }

export type { TTImageProps }
