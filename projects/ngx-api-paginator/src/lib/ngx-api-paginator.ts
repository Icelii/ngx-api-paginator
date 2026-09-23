import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'lib-ngx-api-paginator',
  styles: ``,
  template: `
    <div class="px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sm:px-0">
      @if (showInfo()) {
        <div class="order-2 md:order-1 text-center md:text-left">
          <p class="text-sm text-gray-700">
            {{ textShowing() }}
            <span class="font-bold text-gray-900">{{ startIndex() }}</span>
            {{ textTo() }}
            <span class="font-bold text-gray-900">{{ endIndex() }}</span>
            {{ textOf() }}
            <span class="font-bold text-gray-900">{{ totalItems() }}</span>
            {{ textResults() }}
          </p>
        </div>
      }

      <div class="flex justify-center md:justify-end order-1 md:order-2 w-full sm:w-auto" *ngIf="totalPages() > 1">
        <nav class="flex items-center gap-1.5" aria-label="Pagination"> 
          <button [disabled]="currentPage() === 1" (click)="goToPage(currentPage() - 1)" [class]="getNavButtonClass(hasPrevText())" class="cursor-pointer inline-flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 shrink-0"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 6l-6 6l6 6" /></svg>
            @if (hasPrevText()) {
              <span class="hidden md:inline">{{ textPrevious() }}</span>
            }
          </button>
            
          @for (page of visiblePages(); track $index) {
            @if (page === '...') {
              <span [class]="getEllipsisClass()">
                  {{ page }}
              </span>
            } @else {
              <button (click)="goToPage(page)" [class]="currentPage() === page ? getActivePageClass() : getInactivePageClass()" class="cursor-pointer inline-flex items-center justify-center transition-all">
                  {{ page }}
              </button>
            }
          }
            
          <button (click)="goToPage(currentPage() + 1)" [disabled]="currentPage() === totalPages()" [class]="getNavButtonClass(hasNextText())" class="cursor-pointer inline-flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed">
            @if (hasNextText()) {
              <span class="hidden md:inline">{{ textNext() }}</span>
            }
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 shrink-0"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
          </button>
        </nav>
      </div>
    </div>
  `,
})
export class NgxApiPaginator {
  totalItems = input<number>(0); 
  perPage = input<number>(10);
  currentPage = input<number>(1);
  totalPages = computed(() => Math.max(1, Math.ceil(this.totalItems() / this.perPage())));

  style = input<'rounded' | 'circle' | 'minimal' | 'flat' | 'bordered' | 'shadow'>('rounded');

  showInfo = input<boolean>(true);
  textShowing = input<string>('Mostrando');
  textTo = input<string>('a');
  textOf = input<string>('de');
  textResults = input<string>('resultados');
  textPrevious = input<string>('Anterior');
  textNext = input<string>('Siguiente');

  pageChanged = output<number>(); 

  hasPrevText = computed(() => !!this.textPrevious() && this.textPrevious().trim().length > 0);
  hasNextText = computed(() => !!this.textNext() && this.textNext().trim().length > 0);

  getNavButtonClass = (hasText: boolean): string => {
    const baseStyle = this.style();

    if (!hasText) {
      switch (baseStyle) {
        case 'circle':
          return 'w-9 h-9 rounded-full border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 shadow-xs';
        case 'minimal':
          return 'w-9 h-9 text-gray-600 hover:text-gray-900';
        case 'flat':
          return 'w-9 h-9 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200';
        case 'bordered':
          return 'w-9 h-9 rounded-none border border-gray-300 text-gray-800 bg-white hover:bg-gray-50';
        case 'shadow':
          return 'w-9 h-9 rounded-xl text-gray-700 bg-white hover:bg-gray-50 shadow-md border border-gray-100';
        case 'rounded':
        default:
          return 'w-9 h-9 rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 shadow-xs';
      }
    }

    switch (baseStyle) {
      case 'circle':
        return 'px-3.5 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-xs gap-1';
      case 'minimal':
        return 'px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 gap-1';
      case 'flat':
        return 'px-3.5 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 gap-1';
      case 'bordered':
        return 'px-3 py-2 rounded-none border border-gray-300 text-sm font-medium text-gray-800 bg-white hover:bg-gray-50 gap-1';
      case 'shadow':
        return 'px-4 py-2 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-md border border-gray-100 gap-1';
      case 'rounded':
      default:
        return 'px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-xs gap-1';
    }
  };

  getActivePageClass = (): string => {
    switch (this.style()) {
      case 'minimal':
        return 'w-9 h-9 text-[var(--primary-color)] font-bold text-sm';
      case 'circle':
        return 'w-9 h-9 rounded-full bg-[var(--primary-color)] text-white font-semibold shadow-xs';
      case 'flat':
        return 'w-9 h-9 rounded-lg bg-[var(--primary-color)] text-white font-semibold';
      case 'bordered':
        return 'w-9 h-9 rounded-none bg-[var(--primary-color)] text-white font-semibold border border-[var(--primary-color)]';
      case 'shadow':
        return 'w-9 h-9 rounded-xl bg-[var(--primary-color)] text-white font-semibold shadow-lg shadow-[var(--primary-color)]/30';
      case 'rounded':
      default:
        return 'w-9 h-9 rounded-lg border border-[var(--primary-color)] bg-[var(--primary-color)] text-white font-semibold shadow-xs';
    }
  };

  getInactivePageClass = (): string => {
    switch (this.style()) {
      case 'minimal':
        return 'w-9 h-9 text-gray-500 hover:text-gray-900 font-medium text-sm';
      case 'circle':
        return 'w-9 h-9 rounded-full border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 font-medium shadow-xs';
      case 'flat':
        return 'w-9 h-9 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium';
      case 'bordered':
        return 'w-9 h-9 rounded-none border border-gray-300 text-gray-800 bg-white hover:bg-gray-50 font-medium';
      case 'shadow':
        return 'w-9 h-9 rounded-xl text-gray-700 bg-white hover:bg-gray-50 font-medium shadow-md border border-gray-100';
      case 'rounded':
      default:
        return 'w-9 h-9 rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 font-medium shadow-xs';
    }
  };

  getEllipsisClass = (): string => {
    switch (this.style()) {
      case 'minimal':
        return 'inline-flex items-center justify-center w-9 h-9 text-sm font-medium text-gray-400';
      case 'circle':
        return 'inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-400 shadow-xs';
      case 'flat':
        return 'inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-50 text-sm font-medium text-gray-400';
      case 'bordered':
        return 'inline-flex items-center justify-center w-9 h-9 rounded-none border border-gray-300 bg-white text-sm font-medium text-gray-400';
      case 'shadow':
        return 'inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white text-sm font-medium text-gray-400 shadow-md border border-gray-100';
      case 'rounded':
      default:
        return 'inline-flex items-center justify-center w-9 h-9 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-400 shadow-xs';
    }
  };

  visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: (number | string)[] = [];
    const delta = 1;

    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    pages.push(1);
    if (current > 3) pages.push('...');

    let start = Math.max(2, current - delta);
    let end = Math.min(total - 1, current + delta);
    if (current <= 3) end = 4;
    if (current >= total - 2) start = total - 3;

    for (let i = start; i <= end; i++) pages.push(i);

    if (current < total - 2) pages.push('...');
    pages.push(total);
    return pages;
  });

  startIndex = computed(() => (this.currentPage() - 1) * this.perPage() + 1);
  
  endIndex = computed(() => {
    const end = this.currentPage() * this.perPage();
    return end > this.totalItems() ? this.totalItems() : end;
  });

  goToPage(page: number | string) {
    if (typeof page === 'number' && page >= 1 && page <= this.totalPages()) {
      this.pageChanged.emit(page);
    }
  }
}