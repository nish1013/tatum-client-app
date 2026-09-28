export function SiteFooter() {
  return (
    <footer class="border-t border-line">
      <div class="mx-auto w-full max-w-5xl px-4 py-4 text-sm text-muted sm:px-6">
        &copy; {new Date().getFullYear()}{' '}
        <a href="https://satharasinghe.com/" class="hover:text-ink">
          satharasinghe.com
        </a>
      </div>
    </footer>
  );
}
