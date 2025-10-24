type ToastOptions = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  function toast({ title, description, variant }: ToastOptions) {
    console.log(`[Toast ${variant || "default"}] ${title ?? ""} - ${description ?? ""}`)
  }

  return { toast }
}
EOF
