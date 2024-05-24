export const Apikey = 'AIzaSyCVPKd80uv_3D0e5Ocua3DerfwPayRS6xM'

export const valueconverter = (value) => {
    if(value>=1000000){
        return Math.floor(value / 1000000)+ 'M'
    }
    else if (value>=1000){
        return Math.floor(value / 1000)+'k'
    }
    else {
        return value
    }
}