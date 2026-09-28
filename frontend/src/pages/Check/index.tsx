import { BalanceForm } from './BalanceForm';

export function Check() {
  return (
    <section class="mx-auto w-full max-w-md py-12">
      <h1 class="text-3xl font-semibold tracking-tight text-ink">
        Check a balance
      </h1>
      <p class="mt-2 text-muted">
        Read-only. There is no wallet to connect and nothing to sign.
      </p>
      <div class="mt-8">
        <BalanceForm />
      </div>
    </section>
  );
}
