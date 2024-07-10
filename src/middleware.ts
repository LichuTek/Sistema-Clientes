export {default} from "next-auth/middleware"

export const config = {
    // de esta forma podemos proteger 1 sola ruta matcher: ['/dashboard']
    matcher: ['/dashboard/:path*']
}
