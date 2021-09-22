import { useFetch } from './useFetch'
// import pkgJson from 'element-plus/package.json'

// 获取element-plus版本
// const version = pkgJson.version
const version = '1.1.0-beta.11'
interface ReturnFn {
  getThemeChalkStyle: () => Promise<unknown>;
}
export const useThemeFiles = (): ReturnFn => {
  const getThemeChalkStyle = async (): Promise<unknown> => {
    // return await useFetch('//unpkg.com/element-plus/lib/theme-chalk/index.css')
    // 根据element-plus指定版本去获取主题css
    return await useFetch(
      `//unpkg.com/element-plus@${version}/lib/theme-chalk/index.css`
    )
  }

  return {
    getThemeChalkStyle
  }
}
