import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface IMenuItem {
  id: string;
  category: string;
  route: string;
  title: string;
}

enum C {
  HOME = 'home',
  BASICS = 'basics',
  CORE = 'core',
  EXPERIMENTAL = 'experimental',
  SIGNALS = 'signals',
  RXJS = 'rxjs',
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  openCategory = signal<string | null>(null);
  lastOpenCategory = signal<string | null>(null);
  isCollapsed = signal(false);

  toggleSidebar() {
    const collapsed = !this.isCollapsed();

    this.isCollapsed.set(collapsed);

    if (collapsed) {
      // Sidebar sa zatvára → zapamätaj si otvorenú kategóriu
      this.lastOpenCategory.set(this.openCategory());
      this.openCategory.set(null);
    } else {
      // Sidebar sa otvára → obnov kategóriu
      if (this.lastOpenCategory()) {
        this.openCategory.set(this.lastOpenCategory());
      }
    }
  }

  toggleCategory(name: string) {
    if (this.isCoreCategory(name)) {
      this.openCategory.set(null);
      this.lastOpenCategory.set(null);
      return;
    }

    this.openCategory.update((current) => {
      const newValue = current === name ? null : name;
      if (newValue) {
        this.lastOpenCategory.set(newValue);
      }
      return newValue;
    });
  }

  isCoreCategory(name: string) {
    return name === C.CORE;
  }

  // readonly navLinkClass = 'link-body-emphasis d-inline-flex text-decoration-none rounded';
  readonly menuItems = signal<IMenuItem[]>([
    { id: crypto.randomUUID(), category: C.CORE, route: 'admin', title: 'Admin' },
    { id: crypto.randomUUID(), category: C.HOME, route: 'address', title: 'Address' },
    { id: crypto.randomUUID(), category: C.HOME, route: 'data-binding', title: 'Data-binding' },
    { id: crypto.randomUUID(), category: C.HOME, route: 'profile', title: 'Profile' },
    { id: crypto.randomUUID(), category: C.HOME, route: 'structural', title: 'Structural' },
    { id: crypto.randomUUID(), category: C.HOME, route: 'built-in-pipes', title: 'Built-Pipes' },

    { id: crypto.randomUUID(), category: C.BASICS, route: 'attribute', title: 'Attribute' },
    { id: crypto.randomUUID(), category: C.BASICS, route: 'tdf', title: 'template-driven-form' },
    { id: crypto.randomUUID(), category: C.BASICS, route: 'rf', title: 'reactive-form' },
    { id: crypto.randomUUID(), category: C.BASICS, route: 'add-user', title: 'Add-user' },
    { id: crypto.randomUUID(), category: C.BASICS, route: 'resource-api', title: 'resource-api' },
    { id: crypto.randomUUID(), category: C.BASICS, route: 'employees', title: 'Employees' },
    { id: crypto.randomUUID(), category: C.BASICS, route: 'storage', title: 'Storage' },

    { id: crypto.randomUUID(), category: C.SIGNALS, route: 'signal-forms', title: 'signal-forms' },
    { id: crypto.randomUUID(), category: C.SIGNALS, route: 'vehicles', title: 'vehicles' },

    {
      id: crypto.randomUUID(),
      category: C.EXPERIMENTAL,
      route: 'expense-tracker',
      title: 'expense-tracker',
    },

    {
      id: crypto.randomUUID(),
      category: C.EXPERIMENTAL,
      route: 'user-search',
      title: 'user-search',
    },
    { id: crypto.randomUUID(), category: C.EXPERIMENTAL, route: 'dashboard', title: 'Dashboard' },
    {
      id: crypto.randomUUID(),
      category: C.EXPERIMENTAL,
      route: 'user-details',
      title: 'User-details',
    },
    {
      id: crypto.randomUUID(),
      category: C.EXPERIMENTAL,
      route: 'infinite-scroll',
      title: 'Infinite-scroll',
    },

    {
      id: crypto.randomUUID(),
      category: C.RXJS,
      route: 'photo-gallery',
      title: 'Photo-gallery',
    },
  ]);

  // Derived signal: Groups items by category, excluding CORE
  readonly groupedMenu = computed(() => {
    const items = this.menuItems();

    // 1. Get flat items (CORE)
    const flatItems = items.filter((i) => i.category === C.CORE);

    // 2. Group the rest
    const categories = items
      .filter((i) => i.category !== C.CORE)
      .reduce(
        (acc, item) => {
          if (!acc[item.category]) acc[item.category] = [];
          acc[item.category].push(item);
          return acc;
        },
        {} as Record<string, IMenuItem[]>,
      );

    return { flatItems, categories: Object.entries(categories) };
  });
}
