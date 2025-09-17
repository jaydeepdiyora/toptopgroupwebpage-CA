// Document Management System
class DocumentManager {
  constructor() {
    this.documentsData = {
      left: {
        documents: [
          {
            id: 'application-to-rent-form',
            title: 'Application to Rent Form',
            description: '',
            domain: 'https://drive.google.com/file/d/',
            filename: 'application-to-rent-form.pdf',
            fileId: '16fzAwUvRhWMHGUkoFBBl68jYQk9FfD3k',
          },
          {
            id: 'month-to-month-lease-form',
            title: 'Month-to-Month Lease Form',
            description: '',
            domain: 'https://drive.google.com/file/d/',
            filename: 'month-to-month-lease-form.pdf',
            fileId: '1_IE5yO0DkpEclZcLeUIPVcZxG2M5Rfsg',
          },
          {
            id: 'guarantee-of-rental-agreement-form',
            title: 'Guarantee of Rental Agreement Form',
            description: '',
            domain: 'https://drive.google.com/file/d/',
            filename: 'guarantee-of-rental-agreement-form.pdf',
            fileId: '1Wn-VfHQP0MfmbNdPc_SEYpMUheKGDq-W',
          },
        ],
      },
      right: {
        documents: [
          {
            id: 'resident-service-request-form',
            title: 'Resident Service Request Form',
            description: '',
            domain: 'https://drive.google.com/file/d/',
            filename: 'resident-service-request-form.pdf',
            fileId: '1GCJKN7DgKfFmHbovYXBkf9ZEFe5z_ut5',
          },
          {
            id: 'tenant-incident-complaint-form',
            title: 'Tenant Incident Complaint Form',
            description: '',
            domain: 'https://drive.google.com/file/d/',
            filename: 'tenant-incident-complaint-form.pdf',
            fileId: '1fLTwJIfgLAj8pl2kzgfYFKG-UQ_1b5vX',
          },
          {
            id: 'house-rules',
            title: 'House Rules',
            description: '',
            domain: 'https://docs.google.com/document/d/',
            filename: 'house-rules.pdf',
            fileId: '1CzFI340BwXqx5QGI4h7huXs4D1PgFX46-og534dpio8',
          },
        ],
      },
    };
  }

  // Render all document categories
  renderDocuments() {
    const container = document.querySelector('#documents-tab .space-y-8');
    if (!container) return;

    container.innerHTML = '';

    Object.entries(this.documentsData).forEach(([categoryId, category]) => {
      const categoryElement = this.createCategoryElement(categoryId, category);
      container.appendChild(categoryElement);
    });
  }

  // Create a document category element
  createCategoryElement(categoryId, category) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'card';
    categoryDiv.setAttribute('data-category', categoryId);

    categoryDiv.innerHTML = `
            <div class="card-content">
                <div class="space-y-4">
                    ${category.documents.map((doc) => this.createDocumentHTML(doc)).join('')}
                </div>
            </div>
        `;
    return categoryDiv;
  }

  // Create HTML for a single document
  createDocumentHTML(document) {
    return `
            <div class="document-item" data-document-id="${document.id}">
                <div class="document-info">
                    <div class="document-icon">
                        <img src="assets/document.svg" alt="Tenant Portal File Icon">
                    </div>
                    <div class="document-details">
                        <h4>${document.title}</h4>
                        <p>${document.description}</p>
                    </div>
                </div>
                <button class="btn btn-outline" onclick="documentManager.downloadDocument('${document.fileId}', '${document.filename}', '${document.title}', '${document.domain}')">
                    <svg class="icon" viewBox="0 0 24 24">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7,10 12,15 17,10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download
                </button>
            </div>
        `;
  }

  // Add a new document to a category
  addDocument(categoryId, document) {
    if (this.documentsData[categoryId]) {
      this.documentsData[categoryId].documents.push(document);
      this.renderDocuments();
    }
  }

  // Remove a document from a category
  removeDocument(categoryId, documentId) {
    if (this.documentsData[categoryId]) {
      this.documentsData[categoryId].documents = this.documentsData[categoryId].documents.filter(
        (doc) => doc.id !== documentId
      );
      this.renderDocuments();
    }
  }

  // Add a new category
  addCategory(categoryId, categoryData) {
    this.documentsData[categoryId] = categoryData;
    this.renderDocuments();
  }

  // Remove a category
  removeCategory(categoryId) {
    delete this.documentsData[categoryId];
    this.renderDocuments();
  }

  // Update document details
  updateDocument(categoryId, documentId, updates) {
    if (this.documentsData[categoryId]) {
      const document = this.documentsData[categoryId].documents.find(
        (doc) => doc.id === documentId
      );
      if (document) {
        Object.assign(document, updates);
        this.renderDocuments();
      }
    }
  }

  // Search documents
  searchDocuments(query) {
    const results = [];
    const searchTerm = query.toLowerCase();

    Object.entries(this.documentsData).forEach(([categoryId, category]) => {
      category.documents.forEach((document) => {
        if (
          document.title.toLowerCase().includes(searchTerm) ||
          document.description.toLowerCase().includes(searchTerm)
        ) {
          results.push({
            categoryId,
            categoryTitle: category.title,
            document,
          });
        }
      });
    });

    return results;
  }

  // Filter documents by category
  filterByCategory(categoryId) {
    return this.documentsData[categoryId] || null;
  }

  // Get all documents count
  getTotalDocumentsCount() {
    return Object.values(this.documentsData).reduce((total, category) => {
      return total + category.documents.length;
    }, 0);
  }

  // Download document from Google Drive
  downloadDocument(fileId, filename, documentName, domain) {
    console.log(`Downloading: ${filename}`);
    if (fileId) {
      let downloadUrl;

      // Determine the appropriate action based on the source
      if (domain.includes('docs.google.com')) {
        downloadUrl = `https://docs.google.com/document/d/${fileId}/export?format=pdf`;
      } else if (domain.includes('drive.google.com')) {
        downloadUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&authuser=0`;
      }else{
        downloadUrl = domain;
      }
      // Show download notification
      this.showNotification(`Download started for: ${documentName}`, 'success');

      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      link.target = '_blank';

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Fallback for files not mapped to Google Drive
      this.showNotification(`File not found: ${documentName}`, 'error');
      console.warn(`No Google Drive file ID found for: ${filename}`);
    }
  }

  // Show notification
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 1.5rem',
      borderRadius: '0.5rem',
      color: 'white',
      backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
      zIndex: '9999',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
    });

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Initialize the document manager
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.renderDocuments();
      });
    } else {
      this.renderDocuments();
    }
  }
}

// Create global instance
const documentManager = new DocumentManager();

// Initialize when script loads
documentManager.init();

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DocumentManager;
}
