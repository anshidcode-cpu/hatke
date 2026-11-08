'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/lib/types';

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct: Product | null;
  onSave: (productData: Partial<Product>) => Promise<void>;
}

export default function AdminProductModal({
  isOpen,
  onClose,
  editingProduct,
  onSave,
}: AdminProductModalProps) {
  const [name, setName] = useState('');
  const [nameMl, setNameMl] = useState('');
  const [category, setCategory] = useState('Kitchen');
  const [price, setPrice] = useState(999);
  const [originalPrice, setOriginalPrice] = useState(1499);
  const [costPrice, setCostPrice] = useState(450);
  const [stock, setStock] = useState(25);
  const [image, setImage] = useState('/products/cookware.jpg');
  const [badge, setBadge] = useState<string>('New find');
  const [description, setDescription] = useState('');
  const [descriptionMl, setDescriptionMl] = useState('');
  const [tags, setTags] = useState('Kerala, Desi, Clever');
  const [isFeatured, setIsFeatured] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || '');
      setNameMl(editingProduct.nameMl || '');
      setCategory(editingProduct.category || 'Kitchen');
      setPrice(editingProduct.price || 999);
      setOriginalPrice(editingProduct.originalPrice || 1499);
      setCostPrice((editingProduct as any).costPrice || Math.round((editingProduct.price || 999) * 0.45));
      setStock(editingProduct.stock || 25);
      setImage(editingProduct.image || '/products/cookware.jpg');
      setBadge(editingProduct.badge || 'New find');
      setDescription(editingProduct.description || '');
      setDescriptionMl(editingProduct.descriptionMl || '');
      setTags(Array.isArray(editingProduct.tags) ? editingProduct.tags.join(', ') : 'Kerala, Desi');
      setIsFeatured(editingProduct.isFeatured ?? true);
    } else {
      // Default new product template
      setName('');
      setNameMl('');
      setCategory('Kitchen');
      setPrice(799);
      setOriginalPrice(1199);
      setCostPrice(340);
      setStock(30);
      setImage('/products/cookware.jpg');
      setBadge('New find');
      setDescription('');
      setDescriptionMl('');
      setTags('Kerala, Desi, Everyday');
      setIsFeatured(true);
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  // Margin calculation
  const marginPercent = price > 0 ? Math.round(((price - costPrice) / price) * 100) : 0;
  const discountPercent =
    originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleSubmit = async (status: 'published' | 'draft') => {
    setIsSubmitting(true);
    try {
      await onSave({
        id: editingProduct?.id,
        name,
        nameMl,
        category,
        price: Number(price),
        originalPrice: Number(originalPrice),
        stock: Number(stock),
        image,
        badge: badge as any,
        description,
        descriptionMl,
        tags: tags.split(',').map((t) => t.trim()),
        isFeatured,
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white border-2 border-[#1f5c3a] rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-[#fff8f5] border-b border-[#ede0d9] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1f5c3a]" />
              <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#211a16]">
                {editingProduct ? 'Edit Hatke Product' : 'Add New Hatke Product'}
              </h3>
            </div>
            <p className="font-['Baloo_Chettan_2'] text-xs text-[#835400] mt-0.5">
              കേരള ബസാർ ഉൽപ്പന്നം ലിസ്റ്റ് ചെയ്യുക
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#ede0d9] text-[#707971] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 overflow-y-auto font-['DM_Sans'] text-sm">
          {/* Product Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#211a16] mb-1">
                Product Title (English) *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kerala Brass Puttu Maker"
                className="w-full bg-[#fff8f5] border border-[#c0c9bf] rounded-xl px-3 py-2 text-sm focus:border-[#1f5c3a] focus:ring-1 focus:ring-[#1f5c3a] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#211a16] mb-1">
                Malayalam Tagline (മലയാളം) *
              </label>
              <input
                type="text"
                value={nameMl}
                onChange={(e) => setNameMl(e.target.value)}
                placeholder="ഉദാ: പരമ്പരാഗത പിച്ചള പുട്ടുകുറ്റി"
                className="w-full bg-[#fff8f5] border border-[#c0c9bf] rounded-xl px-3 py-2 text-sm font-['Baloo_Chettan_2'] focus:border-[#1f5c3a] focus:ring-1 focus:ring-[#1f5c3a] focus:outline-none"
              />
            </div>
          </div>

          {/* Category & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#211a16] mb-1">Aisle / Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#fff8f5] border border-[#c0c9bf] rounded-xl px-3 py-2 text-xs font-semibold focus:border-[#1f5c3a] focus:outline-none"
              >
                <option value="Kitchen">Kitchen & Dining (അടുക്കള)</option>
                <option value="Tech">Tech & Gadgets (ടെക്)</option>
                <option value="Kids">Kids & Toys (കുട്ടികൾ)</option>
                <option value="Home">Home & Living (വീട്)</option>
                <option value="Apparel">Apparel & Desi Wear (വസ്ത്രങ്ങൾ)</option>
                <option value="Stationery">Stationery & Office (സ്റ്റേഷനറി)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#211a16] mb-1">Badge Tag</label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full bg-[#fff8f5] border border-[#c0c9bf] rounded-xl px-3 py-2 text-xs font-semibold focus:border-[#1f5c3a] focus:outline-none"
              >
                <option value="New find">New find</option>
                <option value="Only at Hatke">Only at Hatke</option>
                <option value="Viral on reels">Viral on reels</option>
                <option value="Kerala Special">Kerala Special</option>
                <option value="Vishu Special">Vishu Special</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#211a16] mb-1">Stock Count</label>
              <input
                type="number"
                min={0}
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full bg-[#fff8f5] border border-[#c0c9bf] rounded-xl px-3 py-2 text-xs focus:border-[#1f5c3a] focus:outline-none font-bold"
              />
            </div>
          </div>

          {/* Pricing Matrix with Live Margin Calculation */}
          <div className="p-4 rounded-2xl bg-[#fff8f5] border border-[#ede0d9] space-y-3">
            <span className="text-xs font-['Bricolage_Grotesque'] font-bold text-[#211a16] uppercase tracking-wider block">
              Pricing, Cost & Margin Intelligence
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#707971] mb-1">
                  Sale Price (₹) *
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full bg-white border border-[#c0c9bf] rounded-xl px-3 py-1.5 text-sm font-bold text-[#1f5c3a] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#707971] mb-1">
                  MRP Price (₹)
                </label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(Number(e.target.value))}
                  className="w-full bg-white border border-[#c0c9bf] rounded-xl px-3 py-1.5 text-sm line-through text-[#707971] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#707971] mb-1">
                  Estimated COGS (₹)
                </label>
                <input
                  type="number"
                  value={costPrice}
                  onChange={(e) => setCostPrice(Number(e.target.value))}
                  className="w-full bg-white border border-[#c0c9bf] rounded-xl px-3 py-1.5 text-sm text-[#211a16] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#ede0d9] text-xs">
              <span className="text-[#707971]">
                Customer Discount: <strong className="text-emerald-700">{discountPercent}% OFF</strong>
              </span>
              <span className="font-bold text-[#211a16]">
                Gross Profit Margin:{' '}
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-['Bricolage_Grotesque'] ${
                    marginPercent >= 40
                      ? 'bg-[#b1f1c4] text-[#00210f]'
                      : 'bg-[#ffddb5] text-[#835400]'
                  }`}
                >
                  +{marginPercent}% (₹{price - costPrice} profit/unit)
                </span>
              </span>
            </div>
          </div>

          {/* Image & Quick Stickers */}
          <div>
            <label className="block text-xs font-bold text-[#211a16] mb-1">Image URL / Path</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="/products/cookware.jpg"
              className="w-full bg-[#fff8f5] border border-[#c0c9bf] rounded-xl px-3 py-2 text-xs focus:border-[#1f5c3a] focus:outline-none font-mono"
            />
          </div>

          {/* Quick Malayalam Description & Badges */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-[#211a16]">Product Story & Highlights</label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setDescription(
                      (prev) =>
                        prev +
                        '\n"സവാളയും പച്ചമുളകും കണ്ണ് നിറയാതെ നിമിഷങ്ങൾക്കുള്ളിൽ അരിയാം!"'
                    )
                  }
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ffddb5] text-[#2a1800] border border-[#feae32] hover:bg-[#feae32]/30"
                >
                  + Malayalam Quote
                </button>
                <button
                  type="button"
                  onClick={() => setTags((prev) => prev + ', Vishu Special')}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ffd9e1] text-[#a2004e] border border-[#ffb1c4] hover:bg-[#ffd9e1]/80"
                >
                  + Vishu Seal
                </button>
              </div>
            </div>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="High-torque stainless 4-blade mechanism designed for Kerala kitchens..."
              className="w-full bg-[#fff8f5] border border-[#c0c9bf] rounded-xl p-3 text-xs focus:border-[#1f5c3a] focus:ring-1 focus:ring-[#1f5c3a] focus:outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Modal Sticky Footer Actions */}
        <div className="px-6 py-4 bg-[#fff8f5] border-t border-[#ede0d9] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs font-bold text-[#707971] hover:bg-[#ede0d9] transition-colors"
          >
            Discard Changes
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isSubmitting || !name}
              onClick={() => handleSubmit('draft')}
              className="px-4 py-2 rounded-full text-xs font-bold text-[#1f5c3a] bg-white border border-[#1f5c3a] hover:bg-[#1f5c3a]/10 transition-colors"
            >
              Save Draft
            </button>
            <button
              type="button"
              disabled={isSubmitting || !name}
              onClick={() => handleSubmit('published')}
              className="px-5 py-2.5 rounded-full text-xs font-['Bricolage_Grotesque'] font-bold text-white bg-[#1f5c3a] hover:bg-[#14462b] shadow-[2px_2px_0px_#211a16] transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">cloud_done</span>
              <span>{isSubmitting ? 'Syncing...' : 'Publish to Live Bazaar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
