import { CommonModule } from '@angular/common';
import { Component, signal, computed, effect } from '@angular/core';
import { NgxApiPaginator } from 'ngx-api-paginator';
import { TRANSLATIONS } from './core/i18n/translations';
import { Product } from './core/interfaces/product';

@Component({
  imports: [CommonModule, NgxApiPaginator],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
lang = signal<'es' | 'en'>('es');
  showInfoState = signal<boolean>(true);

  translations = TRANSLATIONS;
  t = computed(() => this.translations[this.lang()]);

  customPrevText = signal(this.t().previous);
  customNextText = signal(this.t().next);

  currentPage = signal(1);
  perPage = signal(4);
  totalItems = signal(20);
  
  selectedVariant = signal<'rounded' | 'circle' | 'minimal' | 'flat' | 'bordered' | 'shadow'>('rounded');

  items = signal<Product[]>([]);
  loading = signal(false);

  constructor() {
    effect(() => {
      this.customPrevText.set(this.t().previous);
      this.customNextText.set(this.t().next);
    });

    effect(() => {
      const page = this.currentPage();
      const limit = this.perPage();
      this.fetchProducts(page, limit);
    });
  }

  async fetchProducts(page: number, limit: number) {
    this.loading.set(true);
    try {
      const response = await fetch(`https://fakestoreapi.com/products?limit=${limit}&sort=desc`);
      const data = await response.json();
      
      const offsetProducts = data.map((item: Product, index: number) => ({
        ...item,
        id: item.id + ((page - 1) * 10) + index,
        title: `[Pág ${page}] ${item.title}`
      }));

      this.items.set(offsetProducts);
    } catch (error) {
      console.error('Error fetching API data:', error);
    } finally {
      this.loading.set(false);
    }
  }

  updatePerPage(event: Event) {
    const val = parseInt((event.target as HTMLInputElement).value, 10);
    if (!isNaN(val) && val > 0) {
      this.perPage.set(val);
      this.currentPage.set(1);
    }
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }
}