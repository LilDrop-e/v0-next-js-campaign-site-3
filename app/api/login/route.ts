import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')

    console.log('[v0] Login attempt:', { email })

    // Aqui você adicionaria a lógica real de autenticação
    // Por enquanto, apenas redireciona para /home
    
    return NextResponse.redirect(new URL('/home', request.url))
  } catch (error) {
    console.error('[v0] Login error:', error)
    return NextResponse.redirect(new URL('/?error=auth', request.url))
  }
}
