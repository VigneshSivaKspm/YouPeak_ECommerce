import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, X, Upload } from "lucide-react";
import {
  Button,
  Input,
  Textarea,
  Select,
  Toggle,
  Stepper,
  Card,
  useToast,
} from "@/components/ui";

const steps = [
  "Basic Info",
  "Media",
  "Pricing",
  "Inventory",
  "Variations",
  "Shipping",
  "SEO",
  "Review",
];

const categories = [
  { label: "Men's Fashion", value: "mens" },
  { label: "Women's Fashion", value: "womens" },
  { label: "Electronics", value: "electronics" },
  { label: "Accessories", value: "accessories" },
  { label: "Footwear", value: "footwear" },
  { label: "Home & Kitchen", value: "home" },
];

export default function AddEditProduct() {
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState<string[]>(["Cotton", "Shirt", "Formal"]);
  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { show, ToastEl } = useToast();

  const isEdit = !!id;

  const handleSave = async (publish = false) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    show(
      publish ? "Product published successfully!" : "Saved as draft",
      "success",
    );
    setTimeout(() => navigate("/products"), 1200);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const stepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="space-y-4">
              <Input
                label="Product Name *"
                placeholder="e.g. Men's Premium Cotton Shirt"
                defaultValue={isEdit ? "Wireless Headphones" : ""}
              />
              <div className="grid grid-cols-2 gap-3">
                <Select label="Category *" options={categories} />
                <Select
                  label="Sub Category"
                  options={[
                    { label: "Headphones", value: "headphones" },
                    { label: "Shirts", value: "shirts" },
                  ]}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Brand"
                  placeholder="e.g. YouPeak"
                  defaultValue={isEdit ? "Beat" : ""}
                />
                <Input
                  label="SKU *"
                  placeholder="e.g. YP-TS-550"
                  defaultValue={isEdit ? "WH-1001" : ""}
                />
              </div>
              <Input label="HSN Code" placeholder="e.g. 6109" />
              <Textarea
                label="Short Description"
                placeholder="Brief product description..."
                rows={2}
              />
              <Textarea
                label="Full Description"
                placeholder="Detailed product description..."
                rows={5}
              />
              <div>
                <label className="text-xs font-medium text-[#10252E]">
                  Tags
                </label>
                <div className="mt-1 flex flex-wrap gap-1.5 p-2 border border-[#E5E9E8] rounded-md min-h-[36px] bg-white">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#F5F7F6] text-xs rounded-md text-[#10252E]"
                    >
                      {t}
                      <button
                        onClick={() => setTags(tags.filter((x) => x !== t))}
                      >
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTag()}
                    placeholder="Add tag..."
                    className="border-none outline-none text-xs flex-1 min-w-[80px] bg-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-[#10252E]">
                  Product Status
                </label>
                <Toggle
                  checked={active}
                  onChange={setActive}
                  label={active ? "Active" : "Inactive"}
                />
              </div>
            </div>
            <div className="lg:pl-4 lg:border-l border-[#E5E9E8]">
              <p className="text-xs font-medium text-[#10252E] mb-3">
                Product Images
              </p>
              <div className="border-2 border-dashed border-[#E5E9E8] rounded-xl p-8 text-center hover:border-[#16A34A] transition-colors cursor-pointer">
                <Upload size={32} className="mx-auto text-[#64748B] mb-2" />
                <p className="text-sm font-medium text-[#10252E]">
                  Drag & drop images here
                </p>
                <p className="text-xs text-[#64748B] mt-1">
                  PNG, JPG up to 5MB each
                </p>
                <button className="mt-3 px-4 py-2 text-xs bg-[#16A34A] text-white rounded-lg font-medium hover:bg-[#08783D] transition-colors">
                  Browse Files
                </button>
              </div>
              {images.length === 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg bg-[#F5F7F6] flex items-center justify-center border-2 border-dashed border-[#E5E9E8]"
                    >
                      <Plus size={20} className="text-[#64748B]" />
                    </div>
                  ))}
                </div>
              )}
              <p className="text-[10px] text-[#64748B] mt-2 text-center">
                First image will be the primary product image
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-[#E5E9E8] rounded-xl p-10 text-center hover:border-[#16A34A] transition-colors cursor-pointer">
              <Upload size={40} className="mx-auto text-[#64748B] mb-3" />
              <p className="text-sm font-medium text-[#10252E]">
                Upload Product Images
              </p>
              <p className="text-xs text-[#64748B] mt-1">
                PNG, JPG, WEBP up to 5MB each. Minimum 500×500px recommended.
              </p>
              <button className="mt-4 px-5 py-2 text-sm bg-[#16A34A] text-white rounded-lg font-medium hover:bg-[#08783D] transition-colors">
                Browse Files
              </button>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-[#F5F7F6] flex items-center justify-center border-2 border-dashed border-[#E5E9E8] cursor-pointer hover:border-[#16A34A] transition-colors"
                >
                  {i === 1 ? (
                    <div className="text-center">
                      <p className="text-[10px] text-[#16A34A] font-medium">
                        Primary
                      </p>
                      <Plus size={18} className="mx-auto text-[#16A34A] mt-1" />
                    </div>
                  ) : (
                    <Plus size={18} className="text-[#64748B]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="space-y-4">
              <Input
                label="MRP (Maximum Retail Price) *"
                placeholder="₹0.00"
                type="number"
              />
              <Input
                label="Selling Price *"
                placeholder="₹0.00"
                type="number"
              />
              <Input label="Cost Price" placeholder="₹0.00" type="number" />
              <Input label="Discount %" placeholder="e.g. 20" type="number" />
            </div>
            <div className="space-y-4">
              <Select
                label="Tax / GST %"
                options={[
                  { label: "0%", value: "0" },
                  { label: "5%", value: "5" },
                  { label: "12%", value: "12" },
                  { label: "18%", value: "18" },
                  { label: "28%", value: "28" },
                ]}
              />
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <p className="text-xs font-medium text-green-800">
                  Price Preview
                </p>
                <p className="text-2xl font-bold text-[#16A34A] mt-2">₹0.00</p>
                <p className="text-xs text-green-700 mt-1">
                  After all discounts and taxes applied
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="space-y-4">
              <Input label="SKU" placeholder="Auto-generated if empty" />
              <Input
                label="Available Quantity *"
                placeholder="0"
                type="number"
              />
              <Input label="Reserved Quantity" placeholder="0" type="number" />
              <Input
                label="Low Stock Threshold"
                placeholder="e.g. 10"
                type="number"
              />
            </div>
            <div className="space-y-4">
              <Select
                label="Stock Status"
                options={[
                  { label: "In Stock", value: "in_stock" },
                  { label: "Out of Stock", value: "out_of_stock" },
                  { label: "Pre-Order", value: "pre_order" },
                  { label: "Discontinued", value: "discontinued" },
                ]}
              />
              <div className="p-4 bg-[#F5F7F6] rounded-xl border border-[#E5E9E8]">
                <p className="text-xs font-medium text-[#10252E] mb-2">
                  Inventory Summary
                </p>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-lg font-bold text-[#10252E]">0</p>
                    <p className="text-[10px] text-[#64748B]">Available</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#10252E]">0</p>
                    <p className="text-[10px] text-[#64748B]">Reserved</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#10252E]">0</p>
                    <p className="text-[10px] text-[#64748B]">Total</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <p className="text-sm text-[#64748B]">
              Add product variations like size, color, storage, etc.
            </p>
            <div className="border border-[#E5E9E8] rounded-xl overflow-hidden">
              {[
                { attr: "Size", values: ["XS", "S", "M", "L", "XL"] },
                { attr: "Color", values: ["Black", "White", "Blue"] },
              ].map((v, i) => (
                <div
                  key={i}
                  className={`px-5 py-4 ${i > 0 ? "border-t border-[#E5E9E8]" : ""}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-[#10252E]">
                      {v.attr}
                    </p>
                    <button className="text-xs text-red-500 hover:text-red-700">
                      Remove
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {v.values.map((val) => (
                      <span
                        key={val}
                        className="px-3 py-1 bg-[#F5F7F6] text-xs rounded-full border border-[#E5E9E8] text-[#10252E] flex items-center gap-1"
                      >
                        {val}
                        <X size={10} className="cursor-pointer" />
                      </span>
                    ))}
                    <button className="px-3 py-1 text-xs rounded-full border-2 border-dashed border-[#E5E9E8] text-[#64748B] hover:border-[#16A34A] hover:text-[#16A34A]">
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" icon={<Plus size={13} />}>
              Add Variation Attribute
            </Button>
          </div>
        );

      case 5:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="space-y-4">
              <Input label="Weight (kg)" placeholder="e.g. 0.5" type="number" />
              <div className="grid grid-cols-3 gap-2">
                <Input label="Length (cm)" placeholder="cm" type="number" />
                <Input label="Width (cm)" placeholder="cm" type="number" />
                <Input label="Height (cm)" placeholder="cm" type="number" />
              </div>
              <Select
                label="Shipping Class"
                options={[
                  { label: "Standard", value: "standard" },
                  { label: "Express", value: "express" },
                  { label: "Fragile", value: "fragile" },
                ]}
              />
            </div>
            <div className="space-y-4">
              <Input label="Package Type" placeholder="e.g. Box, Envelope" />
              <Textarea
                label="Packaging Notes"
                placeholder="Special packaging instructions..."
                rows={3}
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4 max-w-lg">
            <Input
              label="SEO Title"
              placeholder="Product page title for search engines"
            />
            <Textarea
              label="Meta Description"
              placeholder="Brief description for search engine results (150-160 chars)..."
              rows={3}
            />
            <Input label="URL Slug" placeholder="product-name" />
            <div className="p-4 bg-[#F5F7F6] rounded-xl border border-[#E5E9E8]">
              <p className="text-[10px] text-[#64748B] mb-1 font-medium">
                Search Preview
              </p>
              <p className="text-sm text-[#1a0dab] font-medium">
                Product Title | YouPeak
              </p>
              <p className="text-xs text-[#006621]">
                youpeak.com › product-name
              </p>
              <p className="text-xs text-[#64748B] mt-1">
                Meta description will appear here...
              </p>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <div className="p-5 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-sm font-semibold text-green-800 mb-2">
                Product Ready to Publish
              </p>
              <p className="text-xs text-green-700">
                Review all details before publishing your product.
              </p>
            </div>
            {[
              { label: "Product Name", value: "Men's Premium Cotton Shirt" },
              { label: "Category", value: "Men's Fashion › Shirts" },
              { label: "Price", value: "₹599" },
              { label: "Stock", value: "120 units" },
              { label: "Status", value: active ? "Active" : "Inactive" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between py-2 border-b border-[#E5E9E8]"
              >
                <span className="text-xs font-medium text-[#64748B]">
                  {label}
                </span>
                <span className="text-xs text-[#10252E]">{value}</span>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-5 max-w-4xl">
      {ToastEl}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/products")}
          className="p-1.5 rounded-lg text-[#64748B] hover:text-[#10252E] hover:bg-white border border-[#E5E9E8] transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <h1 className="text-lg font-semibold text-[#10252E]">
          {isEdit ? "Edit Product" : "Add New Product"}
        </h1>
      </div>

      <Card>
        <Stepper steps={steps} current={step} />
      </Card>

      <Card>
        <h2 className="text-sm font-semibold text-[#10252E] mb-5">
          {steps[step]}
        </h2>
        {stepContent()}
      </Card>

      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          size="md"
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
        >
          Previous
        </Button>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="md"
            onClick={() => handleSave(false)}
          >
            Save as Draft
          </Button>
          {step < steps.length - 1 ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(step + 1)}
            >
              Save & Continue
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              loading={loading}
              onClick={() => handleSave(true)}
            >
              Publish Product
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
