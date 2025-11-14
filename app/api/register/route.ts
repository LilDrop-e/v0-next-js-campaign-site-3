import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    console.log('[v0] Register attempt:', { name, email })

    // Aqui você adicionaria a lógica real de cadastro
    // Por enquanto, apenas redireciona para /home
    
    return NextResponse.redirect(new URL('/home', request.url))
  } catch (error) {
    console.error('[v0] Register error:', error)
    return NextResponse.redirect(new URL('/register?error=registration', request.url))
  }
}
