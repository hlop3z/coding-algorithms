# GTIN

The identifier used for scanning products in retail environments is the **GTIN (Global Trade Item Number)**, which is stored in the `gtin` field of the `ProductIdentifiers` dataclass.

GTIN is the overarching term for the familiar barcodes you see on almost everything. The specific format used depends on the region:

- **UPC-A (GTIN-12):** Standard in North America.
- **EAN-13 (GTIN-13):** Standard in Europe and most other regions globally.
- **GTIN-14:** Used for cartons and multipacks that aren't sold individually.

When a retailer scans an item at the register, they are reading the GTIN. This code then references the internal **SKU (Stock Keeping Unit)** in the retailer's database to retrieve the current price and description.

In the Canvas `identifiers.py` file, the relevant field is:

```python
    gtin: Optional[str] = None
    """
    Global Trade Item Number (GTIN-12, GTIN-13, GTIN-14, UPC, EAN, ISBN).
    This is the globally unique,
```

## Demo

```python
from dataclasses import dataclass
from typing import Optional, List

# --- Core GS1 Identifiers (The Global Standard) ---

@dataclass
class ProductIdentifiers:
    """
    A comprehensive set of identifiers for physical products, covering both
    global standards and internal enterprise requirements for production readiness.

    GTIN is the primary key for global matching, while SKU is the primary key
    for internal inventory management.
    """

    # --- Global Trade Identifiers (GTIN Family) ---

    gtin: Optional[str] = None
    """
    Global Trade Item Number (GTIN-12, GTIN-13, GTIN-14, UPC, EAN, ISBN).
    This is the globally unique, externally visible identifier for the product
    type, assigned by GS1. REQUIRED for mass-produced retail items.
    """

    mpn: Optional[str] = None
    """
    Manufacturer Part Number (MPN). A unique identifier assigned by the product's
    manufacturer. Essential for spare parts, components, and electronics.
    """

    brand: Optional[str] = None
    """
    The brand name associated with the product. Required alongside MPN if GTIN
    is not present (e.g., for non-branded components or small parts).
    """

    # --- Internal Enterprise Identifiers ---

    sku: str = ''
    """
    Stock Keeping Unit (SKU). A unique identifier created by *your* company
    for internal inventory, pricing, and tracking. MANDATORY for enterprise use.
    """

    serial_number: Optional[str] = None
    """
    Serial Number. A unique code assigned to an *individual unit* of the product.
    Crucial for warranty, asset tracking, and after-sales service. Should be
    used in conjunction with GTIN (which identifies the *product type*).
    """

    # --- Highly Specific Identifiers (Optional for most) ---

    batch_or_lot_number: Optional[str] = None
    """
    Identifies the batch or production run the unit belongs to. Critical for
    traceability, especially in food, pharma, and regulated industries.
    """

# --- Service Identifiers ---

@dataclass
class ServiceIdentifiers:
    """
    Identifiers for service offerings, typically relying on internal codes and
    global location standards, as services do not have GTINs.
    """

    service_id: str = ''
    """
    Internal Service ID. A company-specific code (analogous to SKU) to uniquely
    identify the specific service type (e.g., '1-Hour-Consult', 'Premium-Install').
    MANDATORY for enterprise service tracking.
    """

    gln: Optional[str] = None
    """
    Global Location Number (GLN). A unique identifier for legal entities, functional
    locations, or physical locations (e.g., the service provider's HQ, a specific
    service workshop, or an installed asset location). Essential for B2B services
    and supply chain integration.
    """

    service_name: Optional[str] = None
    """
    Human-readable name of the service type.
    """

# --- Financial Security Identifiers (New for ISIN) ---

@dataclass
class SecurityIdentifiers:
    """
    A specialized set of identifiers for financial securities (stocks, bonds,
    options, etc.), which use globally regulated standards.
    """

    isin: str = ''
    """
    International Securities Identification Number (ISIN, ISO 6166).
    The primary globally unique code for financial instruments. MANDATORY.
    """

    cusip: Optional[str] = None
    """
    Committee on Uniform Securities Identification Procedures (CUSIP).
    A 9-character code identifying North American securities. Highly common, but regional.
    """

    sedol: Optional[str] = None
    """
    Stock Exchange Daily Official List (SEDOL). A 7-character code identifying
    securities traded in the UK and Ireland. Highly common, but regional.
    """

    internal_security_id: str = ''
    """
    Internal identifier for local portfolio and reporting use (analogous to SKU).
    """


# --- Example Usage ---

if __name__ == '__main__':

    # 1. Physical Product Example (e.g., a smartphone)
    phone = ProductIdentifiers(
        gtin='0123456789012',                # UPC-A / GTIN
        mpn='M-PN-X14-BLUE-64',              # Manufacturer's specific model number
        brand='TechCorp',
        sku='TC-SMART-BLU-64GB-R1',          # Internal SKU for this exact variant
        serial_number='S20250915B12345',     # Unique to this single unit
        batch_or_lot_number='B092025'        # Production batch
    )

    # 2. Component/Part Example (e.g., a replacement screen)
    part = ProductIdentifiers(
        mpn='SCREEN-OLED-6.1-GEN2',          # Primary ID is the MPN
        brand='DisplayMaster',
        sku='DM-SCREEN-004-R',               # Internal SKU
    )

    # 3. Service Example (e.g., an installation service)
    installation_service = ServiceIdentifiers(
        service_id='SVC-INSTALL-PREM',      # Internal code for premium installation
        gln='4210001010000',                # GLN of the service center location
        service_name='Premium On-Site Installation and Setup'
    )

    # 4. Financial Security Example (e.g., a corporate bond)
    bond = SecurityIdentifiers(
        isin='US0378331005',                 # Apple Inc. stock ISIN
        cusip='037833100',                   # CUSIP for North America
        sedol='2000021',                     # SEDOL for the same security
        internal_security_id='BOND-AAPL-2030'
    )

    print("--- Product Example ---")
    print(phone)

    print("\n--- Service Example ---")
    print(installation_service)

    print("\n--- Security Example ---")
    print(bond)
```
