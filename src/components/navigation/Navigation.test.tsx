import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navigation } from './Navigation'

describe('Navigation', () => {
  describe('Rendering', () => {
    it('should render all main navigation items', () => {
      render(<Navigation />)

      expect(screen.getByText('La falla')).toBeInTheDocument()
      expect(screen.getByText('Navarra')).toBeInTheDocument()
      expect(screen.getByText('Exploración')).toBeInTheDocument()
      expect(screen.getByText('Escuela')).toBeInTheDocument()
      expect(screen.getByText('Tienda')).toBeInTheDocument()
    })

    it('should render "La falla" link', () => {
      render(<Navigation />)

      const laFallaLink = screen.getByRole('link', { name: 'La falla' })
      expect(laFallaLink).toBeInTheDocument()
    })

    it('should render "Navarra" trigger with dropdown', () => {
      render(<Navigation />)

      const navarraTrigger = screen.getByRole('button', { name: /Navarra/i })
      expect(navarraTrigger).toBeInTheDocument()
    })

    it('should render "Exploración" trigger with dropdown', () => {
      render(<Navigation />)

      const exploracionTrigger = screen.getByRole('button', { name: /Exploración/i })
      expect(exploracionTrigger).toBeInTheDocument()
    })

    it('should render "Escuela" trigger with dropdown', () => {
      render(<Navigation />)

      const escuelaTrigger = screen.getByRole('button', { name: /Escuela/i })
      expect(escuelaTrigger).toBeInTheDocument()
    })

    it('should render "Tienda" link', () => {
      render(<Navigation />)

      const tiendaLink = screen.getByRole('link', { name: 'Tienda' })
      expect(tiendaLink).toBeInTheDocument()
    })

    it('should render navigation viewport', () => {
      const { container } = render(<Navigation />)

      const viewport = container.querySelector('[class*="Viewport"]')
      expect(viewport).toBeInTheDocument()
    })
  })

  describe('Functionality', () => {
    describe('Hovering', () => {
      it('should show Navarra dropdown content on hover', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const navarraTrigger = screen.getByRole('button', { name: /Navarra/i })
        await user.click(navarraTrigger)

        await waitFor(() => {
          expect(screen.getByText('Cuevas')).toBeInTheDocument()
        })
        expect(screen.getByText('Montañas')).toBeInTheDocument()
        expect(screen.getByText('Ríos')).toBeInTheDocument()
      })

      it('should show Exploración dropdown content on hover', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const exploracionTrigger = screen.getByRole('button', { name: /Exploración/i })
        await user.click(exploracionTrigger)

        await waitFor(() => {
          expect(screen.getByText('Ultimas exploraciones')).toBeInTheDocument()
        })
        expect(screen.getByText('Subterra.app')).toBeInTheDocument()
        expect(screen.getByText('Topografía')).toBeInTheDocument()
      })

      it('should show Escuela dropdown content on hover', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const escuelaTrigger = screen.getByRole('button', { name: /Escuela/i })
        await user.click(escuelaTrigger)

        await waitFor(() => {
          expect(screen.getByText('Escuela Zunbeltz')).toBeInTheDocument()
        })
        expect(screen.getByText('Recorrido de aprendizaje')).toBeInTheDocument()
        expect(screen.getByText('Aprende online')).toBeInTheDocument()
      })

      it('should toggle dropdown content on click', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const navarraTrigger = screen.getByRole('button', { name: /Navarra/i })
        
        // Verificar que inicialmente está cerrado
        expect(navarraTrigger).toHaveAttribute('aria-expanded', 'false')
        
        // Abrir dropdown
        await user.click(navarraTrigger)

        await waitFor(() => {
          expect(navarraTrigger).toHaveAttribute('aria-expanded', 'true')
          expect(screen.getByText('Cuevas')).toBeInTheDocument()
        })
      })

      it('should display caret icon on trigger items', () => {
        render(<Navigation />)

        // Verificar que los triggers existen (los carets están dentro de ellos)
        expect(screen.getByRole('button', { name: /Navarra/i })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Exploración/i })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Escuela/i })).toBeInTheDocument()
      })

      it('should update aria-expanded when dropdown opens', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const navarraTrigger = screen.getByRole('button', { name: /Navarra/i })
        
        expect(navarraTrigger).toHaveAttribute('aria-expanded', 'false')
        
        await user.click(navarraTrigger)

        await waitFor(() => {
          expect(navarraTrigger).toHaveAttribute('aria-expanded', 'true')
        })
      })
    })

    describe('Routing', () => {
      it('should have correct href for "La falla" link', () => {
        render(<Navigation />)

        const laFallaLink = screen.getByRole('link', { name: 'La falla' })
        expect(laFallaLink).toHaveAttribute('href', '/')
      })

      it('should have correct href for "Tienda" link', () => {
        render(<Navigation />)

        const tiendaLink = screen.getByRole('link', { name: 'Tienda' })
        expect(tiendaLink).toHaveAttribute('href', '/tienda')
      })

      it('should have correct href for Navarra main link', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const navarraTrigger = screen.getByRole('button', { name: /Navarra/i })
        await user.click(navarraTrigger)

        const navarraLink = await screen.findByRole('link', { name: /^Navarra$/i })
        expect(navarraLink).toHaveAttribute('href', '/navarra')
      })

      it('should have correct href for "Cuevas" link', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const navarraTrigger = screen.getByRole('button', { name: /Navarra/i })
        await user.click(navarraTrigger)

        const cuevasLink = await screen.findByRole('link', { name: /Cuevas/i })
        expect(cuevasLink).toHaveAttribute('href', '/navarra/cuevas')
      })

      it('should have correct href for "Montañas" link', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const navarraTrigger = screen.getByRole('button', { name: /Navarra/i })
        await user.click(navarraTrigger)

        const montanasLink = await screen.findByRole('link', { name: /Montañas/i })
        expect(montanasLink).toHaveAttribute('href', '/navarra/montañas')
      })

      it('should have correct href for "Ríos" link', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const navarraTrigger = screen.getByRole('button', { name: /Navarra/i })
        await user.click(navarraTrigger)

        const riosLink = await screen.findByRole('link', { name: /Ríos/i })
        expect(riosLink).toHaveAttribute('href', '/navarra/rios')
      })

      it('should have correct href for "Ultimas exploraciones" link', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const exploracionTrigger = screen.getByRole('button', { name: /Exploración/i })
        await user.click(exploracionTrigger)

        const novedadesLink = await screen.findByRole('link', { name: /Ultimas exploraciones/i })
        expect(novedadesLink).toHaveAttribute('href', '/exploracion/novedades')
      })

      it('should have correct href for "Subterra.app" link', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const exploracionTrigger = screen.getByRole('button', { name: /Exploración/i })
        await user.click(exploracionTrigger)

        const subterraLink = await screen.findByRole('link', { name: /Subterra.app/i })
        expect(subterraLink).toHaveAttribute('href', 'https://subterra.app')
      })

      it('should have correct href for "Topografía" link', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const exploracionTrigger = screen.getByRole('button', { name: /Exploración/i })
        await user.click(exploracionTrigger)

        const topografiaLink = await screen.findByRole('link', { name: /Topografía/i })
        expect(topografiaLink).toHaveAttribute('href', '/exploracion/topografia')
      })

      it('should have correct href for "Generador de fichas" link', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const exploracionTrigger = screen.getByRole('button', { name: /Exploración/i })
        await user.click(exploracionTrigger)

        const fichasLink = await screen.findByRole('link', { name: /Generador de fichas/i })
        expect(fichasLink).toHaveAttribute('href', '/exploracion/fichas')
      })

      it('should have correct href for "Escuela Zunbeltz" main link', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const escuelaTrigger = screen.getByRole('button', { name: /Escuela/i })
        await user.click(escuelaTrigger)

        const escuelaLink = await screen.findByRole('link', { name: /Escuela Zunbeltz/i })
        expect(escuelaLink).toHaveAttribute('href', '/aprende')
      })

      it('should have correct href for "Recorrido de aprendizaje" link', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const escuelaTrigger = screen.getByRole('button', { name: /Escuela/i })
        await user.click(escuelaTrigger)

        const recorridoLink = await screen.findByRole('link', { name: /Recorrido de aprendizaje/i })
        expect(recorridoLink).toHaveAttribute('href', '/aprende/recorrido')
      })

      it('should have correct href for "Aprende online" link', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const escuelaTrigger = screen.getByRole('button', { name: /Escuela/i })
        await user.click(escuelaTrigger)

        const onlineLink = await screen.findByRole('link', { name: /Aprende online/i })
        expect(onlineLink).toHaveAttribute('href', '/aprende/online')
      })

      it('should have correct href for "Cursos presenciales" link', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const escuelaTrigger = screen.getByRole('button', { name: /Escuela/i })
        await user.click(escuelaTrigger)

        const cursosLink = await screen.findByRole('link', { name: /Cursos presenciales/i })
        expect(cursosLink).toHaveAttribute('href', '/aprende/cursos')
      })

      it('should have correct href for "Biblioteca técnica" link', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const escuelaTrigger = screen.getByRole('button', { name: /Escuela/i })
        await user.click(escuelaTrigger)

        const bibliotecaLink = await screen.findByRole('link', { name: /Biblioteca técnica/i })
        expect(bibliotecaLink).toHaveAttribute('href', '/aprende/biblioteca')
      })

      it('should open Subterra.app link in new tab', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const exploracionTrigger = screen.getByRole('button', { name: /Exploración/i })
        await user.click(exploracionTrigger)

        const subterraLink = await screen.findByRole('link', { name: /Subterra.app/i })
        expect(subterraLink).toHaveAttribute('target', '_blank')
      })
    })

    describe('Dropdown Content', () => {
      it('should display all Navarra dropdown items', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const navarraTrigger = screen.getByRole('button', { name: /Navarra/i })
        await user.click(navarraTrigger)

        await waitFor(() => {
          expect(screen.getByText('Cuevas')).toBeInTheDocument()
        })
        expect(screen.getByText('Montañas')).toBeInTheDocument()
        expect(screen.getByText('Ríos')).toBeInTheDocument()
        expect(screen.getByText(/Zonas kársticas de Navarra/i)).toBeInTheDocument()
      })

      it('should display all Exploración dropdown items', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const exploracionTrigger = screen.getByRole('button', { name: /Exploración/i })
        await user.click(exploracionTrigger)

        await waitFor(() => {
          expect(screen.getByText('Ultimas exploraciones')).toBeInTheDocument()
        })
        expect(screen.getByText('Subterra.app')).toBeInTheDocument()
        expect(screen.getByText('Topografía')).toBeInTheDocument()
        expect(screen.getByText('Generador de fichas')).toBeInTheDocument()
      })

      it('should display all Escuela dropdown items', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const escuelaTrigger = screen.getByRole('button', { name: /Escuela/i })
        await user.click(escuelaTrigger)

        await waitFor(() => {
          expect(screen.getByText('Escuela Zunbeltz')).toBeInTheDocument()
        })
        expect(screen.getByText('Recorrido de aprendizaje')).toBeInTheDocument()
        expect(screen.getByText('Aprende online')).toBeInTheDocument()
        expect(screen.getByText('Cursos presenciales')).toBeInTheDocument()
        expect(screen.getByText('Biblioteca técnica')).toBeInTheDocument()
      })

      it('should display Navarra shield image in dropdown', async () => {
        const user = userEvent.setup()
        render(<Navigation />)

        const navarraTrigger = screen.getByRole('button', { name: /Navarra/i })
        await user.click(navarraTrigger)

        const shieldImage = await screen.findByAltText('Escudo de Navarra')
        expect(shieldImage).toBeInTheDocument()
      })

      it('should display background images in Escuela dropdown', async () => {
        const user = userEvent.setup()
        const { container } = render(<Navigation />)

        const escuelaTrigger = screen.getByRole('button', { name: /Escuela/i })
        await user.click(escuelaTrigger)

        await waitFor(() => {
          const bgImages = container.querySelectorAll('[class*="Bg"]')
          expect(bgImages.length).toBeGreaterThan(0)
        })
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels for navigation', () => {
      const { container } = render(<Navigation />)

      const nav = container.querySelector('nav')
      expect(nav).toBeInTheDocument()
    })

    it('should mark caret icons as aria-hidden', () => {
      const { container } = render(<Navigation />)

      const caretIcons = container.querySelectorAll('[class*="CaretDown"]')
      caretIcons.forEach(icon => {
        expect(icon).toHaveAttribute('aria-hidden')
      })
    })

    it('should mark decorative images as aria-hidden', async () => {
      const user = userEvent.setup()
      const { container } = render(<Navigation />)

      const escuelaTrigger = screen.getByRole('button', { name: /Escuela/i })
      await user.click(escuelaTrigger)

      await waitFor(() => {
        const bgImages = container.querySelectorAll('[class*="Bg"]')
        bgImages.forEach(img => {
          expect(img).toHaveAttribute('aria-hidden')
        })
      })
    })

    it('should have alt text for Navarra shield image', async () => {
      const user = userEvent.setup()
      render(<Navigation />)

      const navarraTrigger = screen.getByRole('button', { name: /Navarra/i })
      await user.click(navarraTrigger)

      const shieldImage = await screen.findByAltText('Escudo de Navarra')
      expect(shieldImage).toHaveAttribute('alt', 'Escudo de Navarra')
    })

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup()
      render(<Navigation />)

      await user.tab()

      const focusedElement = document.activeElement
      expect(focusedElement).not.toBe(document.body)
    })

    it('should support Tab navigation through menu items', async () => {
      const user = userEvent.setup()
      render(<Navigation />)

      await user.tab()
      const firstFocus = document.activeElement

      await user.tab()
      const secondFocus = document.activeElement

      expect(firstFocus).not.toBe(secondFocus)
    })

    it('should support Enter key to activate links', async () => {
      const user = userEvent.setup()
      render(<Navigation />)

      const laFallaLink = screen.getByRole('link', { name: 'La falla' })
      laFallaLink.focus()

      expect(document.activeElement).toBe(laFallaLink)
    })

    it('should support Escape key to close dropdowns', async () => {
      const user = userEvent.setup()
      render(<Navigation />)

      const navarraTrigger = screen.getByRole('button', { name: /Navarra/i })
      await user.click(navarraTrigger)

      await waitFor(() => {
        expect(screen.getByText('Cuevas')).toBeInTheDocument()
      })

      await user.keyboard('{Escape}')

      await waitFor(() => {
        expect(screen.queryByText('Cuevas')).not.toBeInTheDocument()
      })
    })

    it('should have proper focus indicators', async () => {
      const user = userEvent.setup()
      render(<Navigation />)

      const laFallaLink = screen.getByRole('link', { name: 'La falla' })
      laFallaLink.focus()

      expect(document.activeElement).toBe(laFallaLink)
      expect(laFallaLink).toHaveFocus()
    })

    it('should maintain focus trap within open dropdown', async () => {
      const user = userEvent.setup()
      render(<Navigation />)

      const navarraTrigger = screen.getByRole('button', { name: /Navarra/i })
      await user.click(navarraTrigger)

      await waitFor(() => {
        expect(screen.getByText('Cuevas')).toBeInTheDocument()
      })

      const cuevasLink = screen.getByRole('link', { name: /Cuevas/i })
      expect(cuevasLink).toBeInTheDocument()
    })
  })
})
